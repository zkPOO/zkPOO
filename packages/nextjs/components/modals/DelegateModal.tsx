import { FC, useEffect, useMemo, useState } from "react";
import Modal from "./modal";
import { Identity } from "@semaphore-protocol/identity";
import { PrivateKeyAccount, createPublicClient, createWalletClient, http, parseUnits } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { hardhat } from "viem/chains";
import { useSignMessage } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS, HTTP_RPC, SIWE_MESSAGE } from "~~/constants";
import { throwNotification } from "~~/utils/throwNotification";

interface Props {
  modal: boolean;
  toggleModal: () => void;
}

const DelegateModal: FC<Props> = ({ modal, toggleModal }) => {
  const [commitment, setCommitment] = useState("");

  const [daoName, setDaoName] = useState("");
  const [proposalNumber, setProposalNumber] = useState("");
  const [votingPower, setVotingPower] = useState("");
  const [votePrice, setVotePrice] = useState("");

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

  const canDelegate = useMemo(() => {
    if (!daoName || !proposalNumber || !votingPower || !votePrice) return false;
    return true;
  }, [daoName, proposalNumber, votePrice, votingPower]);

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
        functionName: "mint",
        args: [
          BigInt(commitment),
          BigInt(1),
          `${daoName.toLowerCase()}-${proposalNumber.toLowerCase()}`,
          parseUnits(votingPower, 18),
          parseUnits(votePrice, 18),
        ],
        value: BigInt(50000000000000000n),
      });
      client.writeContract(request).then(console.log);
      throwNotification("success", "Transaction completed successfully, you have delegated your voting power.");
      toggleModal();
    };
    call();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commitment]);

  const delegate = async () => signMessage({ message: SIWE_MESSAGE });

  return (
    <Modal title="Delegate Vote" isOpen={modal} closeModal={toggleModal}>
      <div className="flex flex-col gap-2">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-bold -mb-1">DAO Name</span>
          </label>
          <input
            type="text"
            placeholder="Input DAO name"
            className="input input-bordered w-full h-10 placeholder:text-sm"
            value={daoName}
            onChange={e => setDaoName(e.target.value)}
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-bold">Proposal Number</span>
          </label>
          <input
            type="text"
            placeholder="Input DAO proposal number"
            className="input input-bordered w-full h-10 placeholder:text-sm"
            value={proposalNumber}
            onChange={e => setProposalNumber(e.target.value)}
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-bold">Voting Power</span>
          </label>
          <input
            type="text"
            placeholder="Input your voting power"
            className="input input-bordered w-full h-10 placeholder:text-sm"
            value={votingPower}
            onChange={e => setVotingPower(e.target.value)}
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-bold">Vote Price</span>
          </label>
          <input
            type="text"
            placeholder="Input your vote price"
            className="input input-bordered w-full h-10 placeholder:text-sm"
            value={votePrice}
            onChange={e => setVotePrice(e.target.value)}
          />
        </div>
      </div>
      <button
        className={`h-10 w-full bg-primary text-primary-content rounded-lg font-medium mt-4 transition-all duration-300 ${
          canDelegate ? "" : "opacity-50 cursor-not-allowed"
        }`}
        onClick={canDelegate ? delegate : undefined}
      >
        Delegate Vote
      </button>
    </Modal>
  );
};

export default DelegateModal;
