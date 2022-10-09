import type { NextPage, NextPageContext } from "next";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import CustomCalendar from "../components/Calendar/CustomCalendar";
import { getSession, signOut, useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { storeType } from "../redux/store";
import Router from "next/router";
import {
  FaCalendar,
  FaClock,
  FaHamburger,
  FaPowerOff,
  FaShoppingBasket,
  FaShoppingCart,
} from "react-icons/fa";
import { Dine } from ".prisma/client";
import CartModal from "../components/CartModal";
import { getCartItems } from "../redux/cart/cartSlice";

const Home: NextPage = (props) => {
  const [value, onChange] = useState(new Date());
  const [cartModal, openCartModal] = useState(false);
  const cart = useSelector((state: storeType) => state.cart);
  const user = useSelector((state: storeType) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  const handleLogOut = () => {
    Router.push("/login");
    signOut();
    return;
  };
  return (
    <Layout>
      {/* User component */}
      <section className="flex flex-row gap-x-4 bg-neutral-900 p-2">
        {cartModal && <CartModal openModal={openCartModal} />}

        <div className="h-16 w-16 rounded-full bg-neutral-600"></div>
        <div className="flex w-full flex-row justify-between gap-1 text-neutral-200">
          <div className="flex flex-col gap-y-1">
            <h1 className="text-lg font-semibold ">{user.name}</h1>
            <h4 className="text-sm">{user.civId}</h4>
            <h4 className="text-sm">{user.department}</h4>
          </div>

          <div className="flex h-full w-fit flex-row gap-2 lg:m-2 lg:gap-x-4">
            <button className="flex h-8 w-full  cursor-pointer flex-row items-center justify-between border-b-2  border-yellow-600 px-1 transition-all hover:bg-neutral-700 lg:min-w-[4rem] lg:px-3">
              <div className="flex flex-row items-center gap-x-1">
                <FaHamburger size={14} className="text-neutral-400" />
                <h1 className="hidden text-end text-sm font-semibold text-neutral-400 lg:block">
                  Dine
                </h1>
              </div>
              <h4 className="rounded-full p-[0.15rem] px-1  text-center text-sm font-semibold text-neutral-200 lg:ml-2">
                6
              </h4>
            </button>

            <button
              onClick={() => openCartModal(true)}
              className="flex h-8 w-full cursor-pointer flex-row items-center justify-between gap-x-1 border-b-2  border-green-600 px-1 transition-all hover:bg-neutral-700 lg:min-w-[4rem] lg:px-3  ">
              <div className="flex flex-row items-center gap-x-1">
                <FaShoppingCart size={14} className="text-neutral-400" />
                <h1 className="hidden text-sm font-semibold text-neutral-400 lg:block">
                  Cart
                </h1>
              </div>
              <h4 className="rounded-full p-[0.15rem] px-1  text-center text-sm font-semibold text-neutral-200 lg:ml-2">
                {cart.dine.length}
              </h4>
            </button>

            {/* <button
              onClick={handleLogOut}
              className=" flex h-8  cursor-pointer flex-row items-center rounded-xl bg-red-800 px-3 text-center transition-all hover:bg-red-700">
              <FaPowerOff size={14} className=" text-center" />
            </button> */}
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
  return {
    props: { data }, // will be passed to the page component as props
  };
}

export default Home;
