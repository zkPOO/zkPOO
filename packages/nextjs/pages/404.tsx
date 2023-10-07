import { FC } from "react";
import Link from "next/link";

const Custom404: FC = () => {
  return (
    <div className="grid place-content-center mt-32 overflow-hidden">
      <div className="container lg:mx-auto max-w-md text-center">
        <h1 className="text-4xl font-bold text-primary my-4">404 - Page Not Found</h1>
        <p>
          Sorry, we could not find the page you are looking for. Instead, here are some similar pages that could help:
        </p>
        <div className="border border-b-gray-50 my-4"></div>
        <Link className="hover:underline text-primary" href="/">
          Go to Home Page
        </Link>
      </div>
    </div>
  );
};
export default Custom404;
