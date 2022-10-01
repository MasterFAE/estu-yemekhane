import Head from "next/head";
import React from "react";

type Props = {
  children: any;
};

const Layout = (props: Props) => {
  return (
    <div>
      <Head>
        <title>Yemekhane - ESTÜ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-neutral-900">
        <div className="m-auto flex w-3/4 bg-neutral-800">
          <main className="w-full p-4">{props.children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
