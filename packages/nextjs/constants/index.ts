import contracts from "~~/generated/deployedContracts";

export const SIWE_MESSAGE = "I give permission to zkPOO to perform transactions on my behalf.";

export const CONTRACT_ADDRESS = contracts[11155111][0].contracts.Marketplace.address;
export const CONTRACT_ABI = contracts[11155111][0].contracts.Marketplace.abi;

export const HTTP_RPC = "https://ethereum-sepolia.publicnode.com";
