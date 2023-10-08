import Link from "next/link";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center gap-6 px-16 mt-44 mb-24">
          <h1 className="font-black text-5xl text-center">
            Delegate Your Vote & Guard Your Privacy. <strong className="text-primary">Your Vote, Your Secret.</strong>
            {/* <strong className="text-primary">Vote Delegation Marketplace.</strong> */}
          </h1>
          <p className="font-medium text-center mx-28 opacity-90">
            Discover a paradigm shift in democratic engagement with zkPOO{"'"}s groundbreaking protocol. Delegate your
            vote securely while keeping your identity confidential, ensuring that your voice remains your secret,
            empowering a more private and impactful democratic process.
          </p>
          <div className="flex gap-4 items-center">
            <Link href={"/market"} className="btn btn-primary btn-sm normal-case h-12 w-40 text-sm" type="button">
              Marketplace
            </Link>

            <button className="btn btn-primary btn-outline btn-sm normal-case h-12 w-40 text-sm" type="button">
              Watch video
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
