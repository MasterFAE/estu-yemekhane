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
  FaSignOutAlt,
} from "react-icons/fa";
import { Dine } from ".prisma/client";
import CartModal from "../components/CartModal";
import { getCartItems } from "../redux/cart/cartSlice";
import {
  addMessage,
  SystemMessageType,
} from "../redux/system-message/systemMessageSlice";
import addSystemMessage from "../lib/addSystemMessage";

/*

  TODO:

    [] Gün fonksiyonlarını UTC'ye çevir
    [] Kahvaltı/Öğlen Yemeği/Akşam yemeği inputlarına göre render
    [] System error entegrasyonu
    [] Rezervasyon kartı(Dines)
    [] Takvimin rezerve edilmiş günleri + butonu olmayacak ve ikon mikonla gösterilcek
    [] Geçmiş günlerin + butonları kapanacak
    [] Sadece 2 gün sonraki + butonlar açık olacak
    [] O günkü alım için günlük yemek al seçeneği

*/

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

          <div className="flex h-full w-fit flex-col gap-2 lg:m-2 lg:flex-row lg:gap-x-4 ">
            <button className="flex h-8 w-full  cursor-pointer flex-row items-center justify-between border-b-2  border-yellow-600 px-1 transition-all hover:bg-neutral-700 lg:min-w-[4rem] lg:px-3">
              <div className="flex flex-row items-center gap-x-[0.35rem]">
                <FaHamburger size={14} className="mb-[2px] text-neutral-400" />
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
              <div className="flex flex-row items-center gap-x-[0.35rem]">
                <FaShoppingCart
                  size={14}
                  className="mb-[2px] text-neutral-400"
                />
                <h1 className="hidden text-sm font-semibold text-neutral-400 lg:block">
                  Cart
                </h1>
              </div>
              <h4 className="rounded-full p-[0.15rem] px-1  text-center text-sm font-semibold text-neutral-200 lg:ml-2">
                {cart.dine.length}
              </h4>
            </button>
            <button
              onClick={handleLogOut}
              className="flex h-8 w-full cursor-pointer items-center justify-center border-b-2 border-red-600  transition-all lg:w-fit  lg:px-3">
              <div className="mb-[4px] items-center rounded-lg bg-red-800 p-[0.4rem] text-neutral-100 transition-all hover:text-neutral-800">
                <FaSignOutAlt size={14} />
              </div>
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
  return {
    props: { data }, // will be passed to the page component as props
  };
}

export default Home;
