import { FC } from "react";

const Market: FC = () => {
  return (
    <div className="grid grid-cols-3 gap-5 mx-auto max-w-7xl px-4">
      <div className="bg-base-300 px-4 py-2 rounded-xl">
        <div className="flex items-center justify-between">
          <a className="font-bold hover:text-primary cursor-pointer transition-all duration-300">@MakerDAO</a>
          <p className="text-sm">Proposal #4325</p>
        </div>
        <div className="divider m-0"></div>
        <div className="flex items-center justify-between">
          <strong className="text-sm">Vote Price</strong>
          <p className="text-sm my-2">30 DAI</p>
        </div>
        <div className="flex items-center justify-between">
          <strong className="text-sm">Voting Power</strong>
          <p className="text-sm my-2">4500 DAI</p>
        </div>
        <div className="flex items-center justify-between">
          <strong className="text-sm">Voting System</strong>
          <p className="text-sm my-2">Single choice voting</p>
        </div>
        <div className="flex items-center justify-between">
          <strong className="text-sm">Start Date</strong>
          <p className="text-sm my-2">Oct 7, 2023, 12:00 PM</p>
        </div>
        <div className="flex items-center justify-between">
          <strong className="text-sm">End Date</strong>
          <p className="text-sm my-2">Oct 9, 2023, 12:00 PM</p>
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
          <button className="h-10 w-full bg-primary text-primary-content rounded-lg font-medium">Purchase Vote</button>
        </div>
      </div>
      <div className="bg-base-300 px-4 py-2 rounded-xl">
        <div className="flex items-center justify-between">
          <p className="font-bold">@MakerDAO</p>
          <p className="text-sm">Proposal #4325</p>
        </div>
      </div>
    </div>
  );
};

export default Market;
