import { useSession } from "next-auth/react";
import Head from "next/head";
import Router from "next/router";
import React, { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storeType } from "../redux/store";
import { getCurrentUser } from "../redux/user/userSlice";
import Footer from "./Footer";
import Loading from "./Loading";
import SystemMessage from "./SystemMessage";

type Props = {
  children: any;
};

const Layout = (props: Props) => {
  const session = useSession();
  const dispatch = useDispatch<any>();
  const systemMessage = useSelector((state: storeType) => state.systemMessage);
  useEffect(() => {
    if (session.status != "loading" && session.data) {
      dispatch(getCurrentUser(session?.data?.user?.username));
    }
    if (session.status == "unauthenticated") Router.push("/login");
  }, [session]);

  if (session.status == "loading") return <Loading />;
  if (session.status != "authenticated" && !session.data) {
    return (
      <div>
        <Head>
          <title>Yemekhane - ESTÜ</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Suspense fallback={<Loading />}>
          <main className="h-screen w-full bg-neutral-800"></main>
        </Suspense>
      </div>
    );
  }
  return (
    <div>
      <Head>
        <title>Yemekhane - ESTÜ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Suspense fallback={<Loading />}>
        <div className="bg-neutral-900">
          {/* ERROR LIST HANDLER */}
          <div className="z-70 fixed top-5 right-0 m-auto flex max-h-screen flex-col gap-y-2 sm:right-5">
            {systemMessage.map((e) => {
              return <SystemMessage item={e} key={null} />;
            })}
          </div>
          <div className="m-auto flex w-full gap-x-2 bg-neutral-800 lg:w-3/4">
            <main className="w-full p-4">{props.children}</main>
          </div>
          <Footer />
        </div>
      </Suspense>
    </div>
  );
};

export default Layout;
