// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

// import "hardhat/console.sol";

contract Marketplace is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint256 public groupId;

    uint256 MAX_INT =
        0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff;

    struct MarketItem {
        bool listing;
        uint256 price;
        uint256 publisher;
    }

    // collection[commitment] = tokenIds[]
    mapping(uint256 => uint256[]) private collection;

    // marketplace[id] = MarketItem
    mapping(uint256 => MarketItem) public marketplace;

    constructor(
        string memory name,
        string memory symbol
    ) ERC721(name, symbol) {}

    modifier validTokenId(uint256 _tokenId) {
        require(_exists(_tokenId), "modifier: Invalid tokenId");
        _;
    }

    function mint(
        uint256 _commitment,
        string memory _tokenURI
    ) public returns (uint256) {
        // require(balances[_commitment] >= MINT_PRICE, "mint: you don't have enough balance to mint");

        _tokenIds.increment();

        uint256 mintId = _tokenIds.current();

        _mint(address(this), mintId);
        _setTokenURI(mintId, _tokenURI);

        MarketItem memory item;
        item.listing = false;
        item.price = MAX_INT;
        item.publisher = _commitment;

        marketplace[mintId] = item;
        collection[_commitment].push(mintId);

        return mintId;
    }

    function listOnMarketplace(
        uint256 _commitment,
        uint256 _tokenId,
        uint256 _price
    ) public validTokenId(_tokenId) {
        require(
            _isOwnerOfTokenId(_commitment, _tokenId),
            "listOnMarketplace: only owner can list the token on marketplace"
        );
        marketplace[_tokenId].listing = true;
        marketplace[_tokenId].price = _price;
    }

    function removeFromMarketplace(
        uint256 _commitment,
        uint256 _tokenId
    ) public validTokenId(_tokenId) {
        require(
            _isOwnerOfTokenId(_commitment, _tokenId),
            "removeFromMarketplace: only owner can remove the token from marketplace"
        );
        marketplace[_tokenId].listing = false;
        marketplace[_tokenId].price = MAX_INT;
    }

    function redeem(
        uint256 _commitment,
        uint256 _tokenId,
        address _recipient
    ) public validTokenId(_tokenId) {
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
        uint256 _tokenId
    ) public validTokenId(_tokenId) {
        require(
            marketplace[_tokenId].listing,
            "purchase: the token is not listed"
        );

        _addToCollection(_commitment, _tokenId);
        _removeFromCollection(marketplace[_tokenId].publisher, _tokenId);

        marketplace[_tokenId].listing = false;
        marketplace[_tokenId].price = MAX_INT;
        marketplace[_tokenId].publisher = _commitment;
    }

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
