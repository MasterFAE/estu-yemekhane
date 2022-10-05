import type { NextPage, NextPageContext } from "next";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import CustomCalendar from "../components/Calendar/CustomCalendar";
import { getSession, signOut, useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { storeType } from "../redux/store";
import Router from "next/router";
import {
  FaCalendar,
  FaClock,
  FaPowerOff,
  FaShoppingBasket,
  FaShoppingCart,
} from "react-icons/fa";
import { Dine } from ".prisma/client";

const Home: NextPage = (props) => {
  const [value, onChange] = useState(new Date());
  const user = useSelector((state: storeType) => state.user);
  const handleLogOut = () => {
    Router.push("/login");
    signOut();
    return;
  };
  return (
    <Layout>
      {/* User component */}
      <section className="flex flex-row gap-x-4 bg-neutral-900 p-2">
        <div className="h-16 w-16 rounded-full bg-neutral-600"></div>
        <div className="flex w-full flex-row justify-between gap-1 text-neutral-200">
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold ">{user.name}</h1>
            <h4 className="text-sm">{user.civId}</h4>
            <h4 className="text-sm">{user.department}</h4>
          </div>

          <div className="flex h-full  flex-col items-center gap-y-2 text-neutral-100 lg:flex-row lg:gap-x-4">
            <button
              onClick={handleLogOut}
              className=" h-8 min-w-[4rem] cursor-pointer rounded-xl bg-red-600 text-center font-bold transition-all hover:bg-red-700">
              <FaPowerOff size={14} className="w-full text-center" />
            </button>
            <button className="flex h-8 w-full min-w-[4rem] cursor-pointer flex-row items-center justify-between rounded-xl bg-blue-600 px-3  transition-all hover:bg-blue-700">
              <FaClock size={14} />
              <h1 className="text-sm font-bold">12</h1>
            </button>
            <button className="flex h-8 min-w-[4rem] cursor-pointer flex-row items-center justify-between rounded-xl bg-green-600 px-3 transition-all hover:bg-green-700">
              <FaShoppingCart size={14} />
              <h1 className="text-sm font-bold">44</h1>
            </button>
          </div>
        </div>
      </section>
      {/* Calendar */}
      <section>
        <CustomCalendar data={props.data} />
      </section>
    </Layout>
  );
};

export async function getStaticProps() {
  const request = await fetch("http://localhost:3000/api/dine", {
    method: "GET",
  });
  const data = await request.json();
  console.log({ data });
  return {
    props: { data }, // will be passed to the page component as props
  };
}

export default Home;
