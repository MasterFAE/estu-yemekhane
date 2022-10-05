import { useSession } from "next-auth/react";
import Head from "next/head";
import Router from "next/router";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../redux/user/userSlice";

type Props = {
  children: any;
};

const Layout = (props: Props) => {
  const session = useSession();
  const dispatch = useDispatch();
  useEffect(() => {
    if (session.status != "loading") {
      dispatch(getCurrentUser(session.data?.user.username));
    }
    if (session.status == "unauthenticated") Router.replace("/login");
  }, [session]);

  if (session.status == "loading") return <h1>Loading</h1>;
  return (
    <div>
      <Head>
        <title>Yemekhane - ESTÜ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-neutral-900">
        <div className="m-auto flex w-full bg-neutral-800 lg:w-3/4">
          <main className="w-full p-4">{props.children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
