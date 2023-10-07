import { FC, useEffect, useState } from "react";
import { Group } from "@semaphore-protocol/group";
import { Identity } from "@semaphore-protocol/identity";
import { generateProof } from "@semaphore-protocol/proof";
import { BigNumber, utils } from "ethers";
import { PrivateKeyAccount, createPublicClient, createWalletClient, formatUnits, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { hardhat } from "viem/chains";
import { useSignMessage } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS, HTTP_RPC, SIWE_MESSAGE } from "~~/constants";
import { throwNotification } from "~~/utils/throwNotification";

interface MarketItem {
  isListed: boolean;
  daoName: string;
  proposalNum: string;
  publisher: bigint;
  serviceId: bigint;
  votingPower: bigint;
  votePrice: bigint;
}

const Dashboard: FC = () => {
  const [commitment, setCommitment] = useState("");
  const [marketItems, setMarketItems] = useState<MarketItem[]>([]);
  const { data: signMessageData, signMessage } = useSignMessage();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const account: PrivateKeyAccount = privateKeyToAccount(process.env.NEXT_PUBLIC_PRIVATE_KEY! as `0x${string}`);

  const publicClient = createPublicClient({
    chain: hardhat,
    transport: http(HTTP_RPC),
  });

  const client = createWalletClient({
    account,
    chain: hardhat,
    transport: http(HTTP_RPC),
  });

  const sign = () => signMessage({ message: SIWE_MESSAGE });

  useEffect(() => {
    if (!signMessageData) return;

    const identity = new Identity(signMessageData);

    setCommitment(identity.commitment.toString());
  }, [signMessageData]);

  useEffect(() => {
    const client = createPublicClient({
      chain: hardhat,
      transport: http(HTTP_RPC),
    });

    const getMarketplaceItems = async () => {
      let arg = 1;
      const marketplaceItems: MarketItem[] = [];

      while (true) {
        const marketItem = await client.readContract({
          address: CONTRACT_ADDRESS,
          abi: CONTRACT_ABI,
          functionName: "marketplace",
          args: [BigInt(arg)],
        });

        arg += 1;

        if (!marketItem[1]) break;

        if (marketItem[2].toString() === commitment)
          marketplaceItems.push({
            isListed: marketItem[0],
            daoName: marketItem[1].split("-")[0],
            proposalNum: marketItem[1].split("-")[1],
            publisher: marketItem[2],
            serviceId: marketItem[3],
            votingPower: marketItem[4],
            votePrice: marketItem[5],
          });
      }

      setMarketItems(marketplaceItems);
    };

    getMarketplaceItems();
    const interval = setInterval(() => getMarketplaceItems(), 2000);
    return () => {
      clearInterval(interval);
    };
  }, [commitment]);

  const list = async (serviceId: bigint) => {
    const randomNullifer = Math.ceil(Math.random() * (100_000 - 1) + 1);
    const group = new Group(42, 20, [commitment]);

    const signal = BigNumber.from(utils.formatBytes32String(serviceId.toString())).toString();

    const identity = new Identity(signMessageData);

    const { proof, merkleTreeRoot, nullifierHash } = await generateProof(identity, group, randomNullifer, signal);

    const { request } = await publicClient.simulateContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "listOnMarketplace",
      args: [
        BigInt(commitment),
        BigInt(merkleTreeRoot),
        BigInt(signal),
        BigInt(nullifierHash),
        BigInt(randomNullifer),
        proof as any,
        serviceId,
      ],
    });
    client.writeContract(request).then(console.log);
    throwNotification("success", "Transaction completed successfully, you have relisted your delegation.");
  };

  const unlist = async (serviceId: bigint) => {
    const randomNullifer = Math.ceil(Math.random() * (100_000 - 1) + 1);
    // TODO: USERS FROM CONTRACT FIRST
    const group = new Group(42, 20, [commitment]);

    const signal = BigNumber.from(utils.formatBytes32String(serviceId.toString())).toString();

    const identity = new Identity(signMessageData);

    const { proof, merkleTreeRoot, nullifierHash } = await generateProof(identity, group, randomNullifer, signal);

    const { request } = await publicClient.simulateContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "removeFromMarketplace",
      args: [
        BigInt(commitment),
        BigInt(merkleTreeRoot),
        BigInt(signal),
        BigInt(nullifierHash),
        BigInt(randomNullifer),
        proof as any,
        serviceId,
      ],
    });
    client.writeContract(request).then(console.log);
    throwNotification("success", "Transaction completed successfully, you have unlisted your delegation.");
  };

  if (marketItems.length <= 0 && commitment) {
    return (
      <div className="flex items-center justify-center mx-auto max-w-7xl px-4 pt-40 font-bold">
        There are currently no items in the marketplace :{"("}
      </div>
    );
  }

  if (!commitment) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 mx-auto max-w-7xl px-4 pt-40 font-bold">
        You need to sign in to view you delegations.
        <button className="h-10 w-36 bg-primary text-primary-content rounded-lg font-medium" onClick={sign}>
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-5 mx-auto max-w-7xl px-4">
      {marketItems &&
        marketItems.map(marketItem => {
          return (
            <div className="bg-base-300 px-4 py-2 rounded-xl" key={marketItem.serviceId.toString()}>
              <div className="flex items-center justify-between">
                <a className="font-bold hover:text-primary cursor-pointer transition-all duration-300">
                  @{marketItem.daoName}
                </a>
                <p className="text-sm">Proposal #{marketItem.proposalNum}</p>
              </div>
              <div className="divider m-0"></div>
              <div className="flex items-center justify-between">
                <strong className="text-sm">Vote Price</strong>
                <p className="text-sm my-2">{formatUnits(marketItem.votePrice, 18)} DAI</p>
              </div>
              <div className="flex items-center justify-between">
                <strong className="text-sm">Voting Power</strong>
                <p className="text-sm my-2">{formatUnits(marketItem.votingPower, 18)} DAI</p>
              </div>
              <div className="flex items-center justify-between">
                <strong className="text-sm">Voting System</strong>
                <p className="text-sm my-2">Single choice voting</p>
              </div>
              <div className="flex items-center justify-between py-2 gap-4">
                <button
                  className="h-10 w-full bg-primary text-primary-content rounded-lg font-medium"
                  onClick={marketItem.isListed ? () => unlist(marketItem.serviceId) : () => list(marketItem.serviceId)}
                >
                  {marketItem.isListed ? "Unlist" : "Relist"}
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Dashboard;
