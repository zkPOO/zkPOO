import { FC, useState } from "react";
import Link from "next/link";
import { SwitchTheme } from "./SwitchTheme";
import Logo from "./logo";
import Modal from "./modal";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";

const Header: FC = () => {
  const routes = Object.entries({
    Market: "/market",
    Collection: "/collection",
    Mint: "",
  });

  const [modal, setModal] = useState(false);

  return (
    <header className="py-10 mx-auto max-w-7xl">
      {modal && (
        <Modal title="Mint" isOpen={modal} closeModal={() => setModal(false)}>
          This is some children
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
