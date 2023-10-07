// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@semaphore-protocol/contracts/interfaces/ISemaphore.sol";
import "./interfaces/ITalentLayerID.sol";
import "./interfaces/ITalentLayerService.sol";
import "./interfaces/ITalentLayerEscrow.sol";

import "hardhat/console.sol";

contract Marketplace is ERC721URIStorage {
	using Counters for Counters.Counter;
	Counters.Counter private _serviceIds;

	ISemaphore public semaphore;
	ITalentLayerID public talentLayerId;
	ITalentLayerService public talentLayerService;
	ITalentLayerEscrow public talentLayerEscrow;
	address public talentLayerEscrowAddress;

	uint256[] public users;

	address public token;

	uint256 public groupId;

	uint256 MAX_INT =
		0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff;
	string CID = "QmbHiRAtcodV6aKcrbh9RsJwYXCFJG2J6qACwKXNfiYp6p";

	struct MarketItem {
		bool listing;
		string handle;
		uint256 publisher;
		uint256 serviceId;
		uint256 votingPower;
		uint256 votePrice;
	}

	// collection[commitment] = serviceIds[]
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
		talentLayerEscrowAddress = _talentLayerEscrowAddress;
		token = _token;

		groupId = _groupId;

		semaphore.createGroup(groupId, 20, address(this));
	}

	modifier validServiceId(uint256 _serviceId) {
		require(_exists(_serviceId), "modifier: Invalid serviceId");
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
		joinGroup(_commitment);
		users.push(_commitment);

		uint256 profileId = talentLayerId.mintForAddress{ value: msg.value }(
			address(this),
			_platformId,
			_handle
		);

		uint256 serviceId = talentLayerService.createService(
			profileId,
			_platformId,
			CID,
			""
		);

		MarketItem memory item;
		item.listing = true;
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
		uint256 _merkleTreeRoot,
		uint256 _signal,
		uint256 _nullifierHash,
		uint256 _externalNullifier,
		uint256[8] calldata _proof,
		uint256 _serviceId
	) public {
		semaphore.verifyProof(
			groupId,
			_merkleTreeRoot,
			_signal,
			_nullifierHash,
			_externalNullifier,
			_proof
		);

		require(
			_isOwnerOfServiceId(_commitment, _serviceId),
			"listOnMarketplace: only owner can list the token on marketplace"
		);

		marketplace[_serviceId].listing = true;
	}

	function removeFromMarketplace(
		uint256 _commitment,
		uint256 _merkleTreeRoot,
		uint256 _signal,
		uint256 _nullifierHash,
		uint256 _externalNullifier,
		uint256[8] calldata _proof,
		uint256 _serviceId
	) public {
		semaphore.verifyProof(
			groupId,
			_merkleTreeRoot,
			_signal,
			_nullifierHash,
			_externalNullifier,
			_proof
		);

		require(
			_isOwnerOfServiceId(_commitment, _serviceId),
			"removeFromMarketplace: only owner can remove the token from marketplace"
		);

		marketplace[_serviceId].listing = false;
	}

	function redeem(
		uint256 _commitment,
		uint256 _merkleTreeRoot,
		uint256 _signal,
		uint256 _nullifierHash,
		uint256 _externalNullifier,
		uint256[8] calldata _proof,
		uint256 _serviceId,
		address _recipient
	) public validServiceId(_serviceId) {
		semaphore.verifyProof(
			groupId,
			_merkleTreeRoot,
			_signal,
			_nullifierHash,
			_externalNullifier,
			_proof
		);

		require(
			!marketplace[_serviceId].listing,
			"purchase: the token is listed"
		);
		require(
			_isOwnerOfServiceId(_commitment, _serviceId),
			"redeem: only owner can redeem their token"
		);

		_transfer(address(this), _recipient, _serviceId);
		_removeFromCollection(_commitment, _serviceId);
	}

	function purchase(
		uint256 _commitment,
		uint256 _serviceId,
		uint256 _platformId,
		string memory _handle
	) public payable {
		require(
			marketplace[_serviceId].listing,
			"purchase: the token is not listed"
		);

		uint256 amount = marketplace[_serviceId].votingPower;

		uint256 profileId = talentLayerId.mintForAddress{ value: msg.value }(
			address(this),
			_platformId,
			_handle
		);

		uint256 proposalId = talentLayerService.createProposal(
			profileId,
			_serviceId,
			token,
			amount,
			_platformId,
			CID,
			MAX_INT,
			""
		);

		IERC20 rateToken = IERC20(token);

		rateToken.approve(talentLayerEscrowAddress, MAX_INT);

		uint256 transactionId = talentLayerEscrow.createTransaction(
			_serviceId,
			proposalId,
			CID,
			CID
		);

		// // TODO: VOTING LOGIC HERE...

		talentLayerEscrow.release(profileId, transactionId, amount);
		// _addToCollection(_commitment, _serviceId);
		// _removeFromCollection(marketplace[_serviceId].publisher, _serviceId);

		marketplace[_serviceId].listing = false;
		marketplace[_serviceId].publisher = _commitment;
	}

	function _isOwnerOfServiceId(
		uint256 _commitment,
		uint256 _serviceId
	) private view returns (bool) {
		uint256[] storage tokens = collection[_commitment];
		for (uint256 i = 0; i < tokens.length; i++) {
			if (tokens[i] == _serviceId) {
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
		uint256 _serviceId
	) public view returns (MarketItem memory marketplaceItem) {
		return marketplace[_serviceId];
	}

	function currentMintId() public view returns (uint256 mintId) {
		return _serviceIds.current();
	}
}
