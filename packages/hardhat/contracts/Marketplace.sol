// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@semaphore-protocol/contracts/interfaces/ISemaphore.sol";
import "./interfaces/ITalentLayerID.sol";
import "./interfaces/ITalentLayerService.sol";
import "./interfaces/ITalentLayerEscrow.sol";

// import "hardhat/console.sol";

contract Marketplace is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    ISemaphore public semaphore;
    ITalentLayerID public talentLayerId;
    ITalentLayerService public talentLayerService;
    ITalentLayerEscrow public talentLayerEscrow;

    address public token;

    uint256 public groupId;

    uint256 MAX_INT =
        0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff;

    struct MarketItem {
        bool listing;
        string handle;
        uint256 publisher;
        uint256 serviceId;
        uint256 votingPower;
        uint256 votePrice;
    }

    // collection[commitment] = tokenIds[]
    mapping(uint256 => uint256[]) private collection;

    // marketplace[id] = MarketItem
    mapping(uint256 => MarketItem) public marketplace;

    constructor(
        string memory name,
        string memory symbol,
        address _semaphoreAddress,
        address _talentLayerIdAddress,
        address _talentLayerServiceAddress,
        address _talentLayerEscrowAddress,
        address _token,
        uint256 _groupId
    ) ERC721(name, symbol) {
        semaphore = ISemaphore(_semaphoreAddress);
        talentLayerId = ITalentLayerID(_talentLayerIdAddress);
        talentLayerService = ITalentLayerService(_talentLayerServiceAddress);
        talentLayerEscrow = ITalentLayerEscrow(_talentLayerEscrowAddress);
        token = _token;

        groupId = _groupId;

        semaphore.createGroup(groupId, 20, address(this));
    }

    modifier validTokenId(uint256 _tokenId) {
        require(_exists(_tokenId), "modifier: Invalid tokenId");
        _;
    }

    function joinGroup(uint256 _commitment) public {
        semaphore.addMember(groupId, _commitment);
    }

    function mint(
        uint256 _commitment,
        uint256 _platformId,
        string calldata _handle,
        uint256 _votingPower,
        uint256 _votePrice
    ) public payable returns (uint256) {
        // require(balances[_commitment] >= MINT_PRICE, "mint: you don't have enough balance to mint");

        // _tokenIds.increment();

        uint256 profileId = talentLayerId.mintForAddress{value: msg.value}(address(this), _platformId, _handle);

        uint256 serviceId = talentLayerService.createService(profileId, _platformId, 'QmbHiRAtcodV6aKcrbh9RsJwYXCFJG2J6qACwKXNfiYp6p', '');
        // uint256 mintId = _tokenIds.current();

        // _mint(address(this), mintId);
        // _setTokenURI(mintId, _tokenURI);

        MarketItem memory item;
        item.listing = false;
        item.publisher = _commitment;
        item.serviceId = serviceId;
        item.votingPower = _votingPower;
        item.votePrice = _votePrice;
        item.handle = _handle;

        marketplace[serviceId] = item;
        collection[_commitment].push(serviceId);

        return serviceId;
    }

    function listOnMarketplace(
        uint256 _commitment,
        uint256 _profileId,
        uint256 _merkleTreeRoot,
        uint256 _signal,
        uint256 _nullifierHash,
        uint256 _externalNullifier,
        uint256[8] calldata _proof,
        uint256 _tokenId,
        uint256 _price
    ) public validTokenId(_tokenId) {
        semaphore.verifyProof(
            groupId,
            _merkleTreeRoot,
            _signal,
            _nullifierHash,
            _externalNullifier,
            _proof
        );

        uint256 serviceId = talentLayerService.createService(_profileId, 1, 'QmbHiRAtcodV6aKcrbh9RsJwYXCFJG2J6qACwKXNfiYp6p', '');

        require(
            _isOwnerOfTokenId(_commitment, _tokenId),
            "listOnMarketplace: only owner can list the token on marketplace"
        );
        marketplace[_tokenId].listing = true;
        marketplace[_tokenId].serviceId = serviceId;
    }

    function removeFromMarketplace(
        uint256 _commitment,
        uint256 _merkleTreeRoot,
        uint256 _signal,
        uint256 _nullifierHash,
        uint256 _externalNullifier,
        uint256[8] calldata _proof,
        uint256 _tokenId
    ) public validTokenId(_tokenId) {
        semaphore.verifyProof(
            groupId,
            _merkleTreeRoot,
            _signal,
            _nullifierHash,
            _externalNullifier,
            _proof
        );

        require(
            _isOwnerOfTokenId(_commitment, _tokenId),
            "removeFromMarketplace: only owner can remove the token from marketplace"
        );
        marketplace[_tokenId].listing = false;
    }

    function redeem(
        uint256 _commitment,
        uint256 _merkleTreeRoot,
        uint256 _signal,
        uint256 _nullifierHash,
        uint256 _externalNullifier,
        uint256[8] calldata _proof,
        uint256 _tokenId,
        address _recipient
    ) public validTokenId(_tokenId) {
        semaphore.verifyProof(
            groupId,
            _merkleTreeRoot,
            _signal,
            _nullifierHash,
            _externalNullifier,
            _proof
        );

        require(
            !marketplace[_tokenId].listing,
            "purchase: the token is listed"
        );
        require(
            _isOwnerOfTokenId(_commitment, _tokenId),
            "redeem: only owner can redeem their token"
        );

        _transfer(address(this), _recipient, _tokenId);
        _removeFromCollection(_commitment, _tokenId);
    }

    function purchase(
        uint256 _commitment,
        uint256 _profileId,
        uint256 _serviceId,
        uint256 _tokenId
    ) public validTokenId(_tokenId) {
        require(
            marketplace[_tokenId].listing,
            "purchase: the token is not listed"
        );

        uint256 proposalId = talentLayerService.createProposal(_profileId, _serviceId, token, 10000, 1, 'QmbHiRAtcodV6aKcrbh9RsJwYXCFJG2J6qACwKXNfiYp6p', 0,'');

        uint256 transactionId = talentLayerEscrow.createTransaction(_serviceId, proposalId, 'QmbHiRAtcodV6aKcrbh9RsJwYXCFJG2J6qACwKXNfiYp6p', 'QmbHiRAtcodV6aKcrbh9RsJwYXCFJG2J6qACwKXNfiYp6p');

        _addToCollection(_commitment, _tokenId);
        _removeFromCollection(marketplace[_tokenId].publisher, _tokenId);

        marketplace[_tokenId].listing = false;
        marketplace[_tokenId].publisher = _commitment;
    }

    // TODO: release
    // Release the tokens after the user has voted...

    function _isOwnerOfTokenId(
        uint256 _commitment,
        uint256 _tokenId
    ) private view returns (bool) {
        uint256[] storage tokens = collection[_commitment];
        for (uint256 i = 0; i < tokens.length; i++) {
            if (tokens[i] == _tokenId) {
                return true;
            }
        }
        return false;
    }

    function _addToCollection(uint256 _commitment, uint256 _index) private {
        collection[_commitment].push(_index);
    }

    function _removeFromCollection(
        uint256 _commitment,
        uint256 _index
    ) private {
        uint256[] storage nfts = collection[_commitment];
        for (uint256 i = 0; i < nfts.length; i++) {
            if (nfts[i] == _index) {
                // Found the number, remove it by swapping with the last element
                nfts[i] = nfts[nfts.length - 1];
                nfts.pop(); // Remove the last element
                break;
            }
        }
    }

    function getCollection(
        uint256 _commitment
    ) public view returns (uint256[] memory collection_) {
        return collection[_commitment];
    }

    function getMarketplaceItem(
        uint256 _tokenId
    ) public view returns (MarketItem memory marketplaceItem) {
        return marketplace[_tokenId];
    }

    function currentMintId() public view returns (uint256 mintId) {
        return _tokenIds.current();
    }
}
