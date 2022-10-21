import Link from "next/link";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="mt-4 flex h-28  w-full flex-col items-center justify-center border-t border-neutral-600 bg-neutral-800 py-2 text-neutral-500">
      <p className="text-center text-neutral-300">
        This is a personal project, not an official website.
        <br /> If you want to contact me links are below.
      </p>
      <div className="mt-2 flex flex-row gap-x-4">
        <h1 className="font-semibold hover:underline">
          <Link href={"https://www.linkedin.com/in/sinan-gurcan/"}>
            LinkedIn
          </Link>
        </h1>
        <h1 className="font-semibold hover:underline">
          <Link href={"https://github.com/MasterFAE"}>GitHub</Link>
        </h1>
        <h1 className="font-normal">sinangurcan26@hotmail.com</h1>
      </div>
    </div>
  );
};

export default Footer;
