const contracts = {
  31337: [
    {
      chainId: "31337",
      name: "localhost",
      contracts: {
        Marketplace: {
          address: "0xa82fF9aFd8f496c3d6ac40E2a0F282E47488CFc9",
          abi: [
            {
              inputs: [
                {
                  internalType: "string",
                  name: "name",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "symbol",
                  type: "string",
                },
                {
                  internalType: "address",
                  name: "_semaphoreAddress",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_talentLayerIdAddress",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_talentLayerServiceAddress",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_talentLayerEscrowAddress",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_token",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "_groupId",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "approved",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "Approval",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "operator",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "bool",
                  name: "approved",
                  type: "bool",
                },
              ],
              name: "ApprovalForAll",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "_fromTokenId",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "_toTokenId",
                  type: "uint256",
                },
              ],
              name: "BatchMetadataUpdate",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "_tokenId",
                  type: "uint256",
                },
              ],
              name: "MetadataUpdate",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "Transfer",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "approve",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
              ],
              name: "balanceOf",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "currentMintId",
              outputs: [
                {
                  internalType: "uint256",
                  name: "mintId",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "getApproved",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_commitment",
                  type: "uint256",
                },
              ],
              name: "getCollection",
              outputs: [
                {
                  internalType: "uint256[]",
                  name: "collection_",
                  type: "uint256[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_serviceId",
                  type: "uint256",
                },
              ],
              name: "getMarketplaceItem",
              outputs: [
                {
                  components: [
                    {
                      internalType: "bool",
                      name: "listing",
                      type: "bool",
                    },
                    {
                      internalType: "string",
                      name: "handle",
                      type: "string",
                    },
                    {
                      internalType: "uint256",
                      name: "publisher",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "serviceId",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "votingPower",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "votePrice",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "startTime",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "endTime",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct Marketplace.MarketItem",
                  name: "marketplaceItem",
                  type: "tuple",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getUsers",
              outputs: [
                {
                  internalType: "uint256[]",
                  name: "_users",
                  type: "uint256[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "groupId",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "isAdded",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "operator",
                  type: "address",
                },
              ],
              name: "isApprovedForAll",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_commitment",
                  type: "uint256",
                },
              ],
              name: "joinGroup",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_commitment",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_merkleTreeRoot",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_signal",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_nullifierHash",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_externalNullifier",
                  type: "uint256",
                },
                {
                  internalType: "uint256[8]",
                  name: "_proof",
                  type: "uint256[8]",
                },
                {
                  internalType: "uint256",
                  name: "_serviceId",
                  type: "uint256",
                },
              ],
              name: "listOnMarketplace",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "marketplace",
              outputs: [
                {
                  internalType: "bool",
                  name: "listing",
                  type: "bool",
                },
                {
                  internalType: "string",
                  name: "handle",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "publisher",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "serviceId",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "votingPower",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "votePrice",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "startTime",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "endTime",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_commitment",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_platformId",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "_handle",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "_votingPower",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_votePrice",
                  type: "uint256",
                },
              ],
              name: "mint",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [],
              name: "name",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "ownerOf",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_commitment",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_serviceId",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_platformId",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "_handle",
                  type: "string",
                },
              ],
              name: "purchase",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_commitment",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_merkleTreeRoot",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_signal",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_nullifierHash",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_externalNullifier",
                  type: "uint256",
                },
                {
                  internalType: "uint256[8]",
                  name: "_proof",
                  type: "uint256[8]",
                },
                {
                  internalType: "uint256",
                  name: "_serviceId",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "_recipient",
                  type: "address",
                },
              ],
              name: "redeem",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_commitment",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_merkleTreeRoot",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_signal",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_nullifierHash",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_externalNullifier",
                  type: "uint256",
                },
                {
                  internalType: "uint256[8]",
                  name: "_proof",
                  type: "uint256[8]",
                },
                {
                  internalType: "uint256",
                  name: "_serviceId",
                  type: "uint256",
                },
              ],
              name: "removeFromMarketplace",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "safeTransferFrom",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes",
                },
              ],
              name: "safeTransferFrom",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "semaphore",
              outputs: [
                {
                  internalType: "contract ISemaphore",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "operator",
                  type: "address",
                },
                {
                  internalType: "bool",
                  name: "approved",
                  type: "bool",
                },
              ],
              name: "setApprovalForAll",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes4",
                  name: "interfaceId",
                  type: "bytes4",
                },
              ],
              name: "supportsInterface",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "symbol",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "talentLayerEscrow",
              outputs: [
                {
                  internalType: "contract ITalentLayerEscrow",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "talentLayerEscrowAddress",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "talentLayerId",
              outputs: [
                {
                  internalType: "contract ITalentLayerID",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "talentLayerService",
              outputs: [
                {
                  internalType: "contract ITalentLayerService",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "token",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "tokenURI",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "transferFrom",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "users",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
      },
    },
  ],
  11155111: [
    {
      chainId: "11155111",
      name: "sepolia",
      contracts: {
        Marketplace: {
          address: "0x7d5Ab27a027db157b7e526573f165290560992b6",
          abi: [
            {
              inputs: [
                {
                  internalType: "string",
                  name: "name",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "symbol",
                  type: "string",
                },
                {
                  internalType: "address",
                  name: "_semaphoreAddress",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_talentLayerIdAddress",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_talentLayerServiceAddress",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_talentLayerEscrowAddress",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_token",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "_groupId",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "approved",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "Approval",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "operator",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "bool",
                  name: "approved",
                  type: "bool",
                },
              ],
              name: "ApprovalForAll",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "_fromTokenId",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "_toTokenId",
                  type: "uint256",
                },
              ],
              name: "BatchMetadataUpdate",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "_tokenId",
                  type: "uint256",
                },
              ],
              name: "MetadataUpdate",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "Transfer",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "approve",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
              ],
              name: "balanceOf",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "currentMintId",
              outputs: [
                {
                  internalType: "uint256",
                  name: "mintId",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "getApproved",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_commitment",
                  type: "uint256",
                },
              ],
              name: "getCollection",
              outputs: [
                {
                  internalType: "uint256[]",
                  name: "collection_",
                  type: "uint256[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_serviceId",
                  type: "uint256",
                },
              ],
              name: "getMarketplaceItem",
              outputs: [
                {
                  components: [
                    {
                      internalType: "bool",
                      name: "listing",
                      type: "bool",
                    },
                    {
                      internalType: "string",
                      name: "handle",
                      type: "string",
                    },
                    {
                      internalType: "uint256",
                      name: "publisher",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "serviceId",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "votingPower",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "votePrice",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "startTime",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "endTime",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct Marketplace.MarketItem",
                  name: "marketplaceItem",
                  type: "tuple",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getUsers",
              outputs: [
                {
                  internalType: "uint256[]",
                  name: "_users",
                  type: "uint256[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "groupId",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "isAdded",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "operator",
                  type: "address",
                },
              ],
              name: "isApprovedForAll",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_commitment",
                  type: "uint256",
                },
              ],
              name: "joinGroup",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_commitment",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_merkleTreeRoot",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_signal",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_nullifierHash",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_externalNullifier",
                  type: "uint256",
                },
                {
                  internalType: "uint256[8]",
                  name: "_proof",
                  type: "uint256[8]",
                },
                {
                  internalType: "uint256",
                  name: "_serviceId",
                  type: "uint256",
                },
              ],
              name: "listOnMarketplace",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "marketplace",
              outputs: [
                {
                  internalType: "bool",
                  name: "listing",
                  type: "bool",
                },
                {
                  internalType: "string",
                  name: "handle",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "publisher",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "serviceId",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "votingPower",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "votePrice",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "startTime",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "endTime",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_commitment",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_platformId",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "_handle",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "_votingPower",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_votePrice",
                  type: "uint256",
                },
              ],
              name: "mint",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [],
              name: "name",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "ownerOf",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_commitment",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_serviceId",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_platformId",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "_handle",
                  type: "string",
                },
              ],
              name: "purchase",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_commitment",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_merkleTreeRoot",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_signal",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_nullifierHash",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_externalNullifier",
                  type: "uint256",
                },
                {
                  internalType: "uint256[8]",
                  name: "_proof",
                  type: "uint256[8]",
                },
                {
                  internalType: "uint256",
                  name: "_serviceId",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "_recipient",
                  type: "address",
                },
              ],
              name: "redeem",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_commitment",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_merkleTreeRoot",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_signal",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_nullifierHash",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_externalNullifier",
                  type: "uint256",
                },
                {
                  internalType: "uint256[8]",
                  name: "_proof",
                  type: "uint256[8]",
                },
                {
                  internalType: "uint256",
                  name: "_serviceId",
                  type: "uint256",
                },
              ],
              name: "removeFromMarketplace",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "safeTransferFrom",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes",
                },
              ],
              name: "safeTransferFrom",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "semaphore",
              outputs: [
                {
                  internalType: "contract ISemaphore",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "operator",
                  type: "address",
                },
                {
                  internalType: "bool",
                  name: "approved",
                  type: "bool",
                },
              ],
              name: "setApprovalForAll",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes4",
                  name: "interfaceId",
                  type: "bytes4",
                },
              ],
              name: "supportsInterface",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "symbol",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "talentLayerEscrow",
              outputs: [
                {
                  internalType: "contract ITalentLayerEscrow",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "talentLayerEscrowAddress",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "talentLayerId",
              outputs: [
                {
                  internalType: "contract ITalentLayerID",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "talentLayerService",
              outputs: [
                {
                  internalType: "contract ITalentLayerService",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "token",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "tokenURI",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "transferFrom",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "users",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;
