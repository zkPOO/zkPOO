import { FC, useEffect, useMemo, useState } from "react";
import Modal from "./modal";
import { Identity } from "@semaphore-protocol/identity";
import { PrivateKeyAccount, createPublicClient, createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";
import { useSignMessage } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS, HTTP_RPC, SIWE_MESSAGE } from "~~/constants";
import { throwNotification } from "~~/utils/throwNotification";

interface Props {
  serviceId: bigint;
  modal: boolean;
  toggleModal: () => void;
}

const PurchaseVote: FC<Props> = ({ serviceId, modal, toggleModal }) => {
  const [isVotedYes, setIsVotedYes] = useState(false);
  const [isVotedNo, setIsVotedNo] = useState(false);
  const [commitment, setCommitment] = useState("");

  const { data: signMessageData, signMessage } = useSignMessage();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const account: PrivateKeyAccount = privateKeyToAccount(process.env.NEXT_PUBLIC_PRIVATE_KEY! as `0x${string}`);

  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(HTTP_RPC),
  });

  const client = createWalletClient({
    account,
    chain: sepolia,
    transport: http(HTTP_RPC),
  });

  const canPurchase = useMemo(() => {
    if (!isVotedYes && !isVotedNo) return false;
    return true;
  }, [isVotedYes, isVotedNo]);

  const voteYes = () => {
    setIsVotedNo(false);
    setIsVotedYes(true);
  };

  const voteNo = () => {
    setIsVotedNo(true);
    setIsVotedYes(false);
  };

  useEffect(() => {
    if (!signMessageData) return;

    const identity = new Identity(signMessageData);

    setCommitment(identity.commitment.toString());
  }, [signMessageData]);

  useEffect(() => {
    if (!commitment) return;

    const call = async () => {
      setCommitment("");
      const { request } = await publicClient.simulateContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "purchase",
        args: [
          BigInt(commitment),
          serviceId,
          BigInt(1),
          `placeholder-${(Math.random() + 1).toString(36).substring(7)}`,
        ],
        value: BigInt(50000000000000000n),
      });
      client.writeContract(request).then(console.log);
      throwNotification("success", "Transaction completed successfully, you have purchased voting power.");
      toggleModal();
    };
    call();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commitment]);

  const purchase = async () => signMessage({ message: SIWE_MESSAGE });

  return (
    <Modal title="Purchase Vote" isOpen={modal} closeModal={toggleModal}>
      <div className="flex flex-col gap-2">
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Vote YES</span>
            <input type="checkbox" checked={isVotedYes} className="checkbox" onClick={voteYes} />
          </label>
        </div>

        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Vote NO</span>
            <input type="checkbox" checked={isVotedNo} className="checkbox" onClick={voteNo} />
          </label>
        </div>
      </div>
      <button
        className={`h-10 w-full bg-primary text-primary-content rounded-lg font-medium mt-4 transition-all duration-300 ${
          canPurchase ? "" : "opacity-50 cursor-not-allowed"
        }`}
        onClick={canPurchase ? purchase : undefined}
      >
        Purchase Vote
      </button>
    </Modal>
  );
};

export default PurchaseVote;
