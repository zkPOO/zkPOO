import { FC, useState } from "react";
import Link from "next/link";
import { SwitchTheme } from "./SwitchTheme";
import Logo from "./logo";
import Modal from "./modal";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";

const Header: FC = () => {
  const routes = Object.entries({
    Market: "/market",
    Dashboard: "/dashboard",
    Delegate: "",
  });

  const [modal, setModal] = useState(false);

  return (
    <header className="py-10 mx-auto max-w-7xl">
      {modal && (
        <Modal title="Delegate Vote" isOpen={modal} closeModal={() => setModal(false)}>
          <div className="flex flex-col gap-2">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold -mb-1">DAO Name</span>
              </label>
              <input
                type="text"
                placeholder="Input DAO name"
                className="input input-bordered w-full h-10 placeholder:text-sm"
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
              />
            </div>
          </div>
          <button className="h-10 w-full bg-primary text-primary-content rounded-lg font-medium mt-4">
            Delegate Vote
          </button>
        </Modal>
      )}
      <nav className="relative z-50 flex justify-between sm:mx-4">
        <div className="flex items-center md:gap-x-8">
          <Logo />
          <div className="hidden md:flex md:gap-x-6">
            {routes.map(([label, route], index) => (
              <Link
                key={index}
                className="inline-block rounded-lg px-2 py-1 text-sm hover:bg-primary hover:text-primary-content transition-all duration-300"
                href={route}
                onClick={route === "" ? () => setModal(true) : undefined}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <SwitchTheme />
          <RainbowKitCustomConnectButton />
        </div>
      </nav>
    </header>
  );
};

export default Header;
