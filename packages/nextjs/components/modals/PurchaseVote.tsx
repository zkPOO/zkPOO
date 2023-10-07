import { FC, useMemo, useState } from "react";
import Modal from "./modal";

interface Props {
  modal: boolean;
  toggleModal: () => void;
}

const PurchaseVote: FC<Props> = ({ modal, toggleModal }) => {
  const [isVotedYes, setIsVotedYes] = useState(false);
  const [isVotedNo, setIsVotedNo] = useState(false);

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

  const purchase = () => {
    console.log("here");
  };

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
