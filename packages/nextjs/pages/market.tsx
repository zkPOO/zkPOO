import { FC, useEffect, useState } from "react";
import { createPublicClient, formatUnits, http } from "viem";
import { sepolia } from "viem/chains";
import PurchaseVote from "~~/components/modals/PurchaseVote";
import { CONTRACT_ABI, CONTRACT_ADDRESS, HTTP_RPC } from "~~/constants";
import { formatDate } from "~~/utils/format";

interface MarketItem {
  isListed: boolean;
  daoName: string;
  proposalNum: string;
  publisher: bigint;
  serviceId: bigint;
  votingPower: bigint;
  votePrice: bigint;
  startTime: string;
  endTime: string;
}

const Market: FC = () => {
  const [modal, setModal] = useState(false);
  const [serviceId, setServiceId] = useState<bigint | undefined>();
  const [marketItems, setMarketItems] = useState<MarketItem[]>([]);

  const toggleModal = () => setModal(!modal);

  const openToggleModal = (serviceId: bigint) => {
    setModal(!modal);
    setServiceId(serviceId);
  };

  useEffect(() => {
    const client = createPublicClient({
      chain: sepolia,
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

        if (marketItem[0])
          marketplaceItems.push({
            isListed: marketItem[0],
            daoName: marketItem[1].split("-")[0],
            proposalNum: marketItem[1].split("-")[1],
            publisher: marketItem[2],
            serviceId: marketItem[3],
            votingPower: marketItem[4],
            votePrice: marketItem[5],
            startTime: formatDate(new Date(parseInt(marketItem[6].toString()) * 1000)),
            endTime: formatDate(new Date(parseInt(marketItem[7].toString()) * 1000)),
          });
      }

      setMarketItems(marketplaceItems);
    };

    getMarketplaceItems();
    const interval = setInterval(() => getMarketplaceItems(), 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  if (marketItems.length <= 0) {
    return (
      <div className="flex items-center justify-center mx-auto max-w-7xl px-4 pt-40 font-bold">
        There are currently no items in the marketplace :{"("}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-5 mx-auto max-w-7xl px-4">
      {modal && !!serviceId && <PurchaseVote serviceId={serviceId} modal={modal} toggleModal={toggleModal} />}
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
              <div className="flex items-center justify-between">
                <strong className="text-sm">Start Date</strong>
                <p className="text-sm my-2">{marketItem.startTime}</p>
              </div>
              <div className="flex items-center justify-between">
                <strong className="text-sm">End Date</strong>
                <p className="text-sm my-2">{marketItem.endTime}</p>
              </div>
              {/* <p className="text-sm">
          <strong>Voting System:</strong> Single choice voting
        </p>
        <p className="text-sm">
          <strong>Start date:</strong> Sep 22, 2023, 12:00 PM{" "}
        </p>
        <p className="text-sm">
          <strong>End date:</strong> Sep 23, 2023, 12:00 PM
        </p> */}
              <div className="flex items-center justify-between py-2 gap-4">
                <button
                  className="h-10 w-full bg-primary text-primary-content rounded-lg font-medium"
                  onClick={() => openToggleModal(marketItem.serviceId)}
                >
                  Purchase Vote
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Market;
