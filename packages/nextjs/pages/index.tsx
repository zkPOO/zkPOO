import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div className="mx-auto max-w-7xl px-4">
        <div className="h-screen flex flex-col items-center justify-center gap-6 px-16 -mt-44">
          <h1 className="font-black text-6xl text-center">
            Think of something to add here... <span className="text-primary">Color here </span>
          </h1>
          <p className="font-medium text-center mx-28 opacity-90">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae eius provident voluptatum harum eaque
            doloribus rem voluptatibus ducimus iste molestias laborum, fugit ullam quaerat magnam perspiciatis
            architecto asperiores voluptatem mollitia!{" "}
          </p>
          <div className="flex gap-4 items-center">
            <button className="btn btn-primary btn-sm normal-case h-12 w-40 text-sm" type="button">
              Marketplace
            </button>

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
