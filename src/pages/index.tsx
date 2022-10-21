import type { NextPage } from "next";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import CustomCalendar from "../components/Calendar/CustomCalendar";
import { signOut } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { storeType } from "../redux/store";
import { FaHamburger, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import CartModal from "../components/CartModal";
import { getCartItems } from "../redux/cart/cartSlice";
import ReservationModal from "../components/ReservationModal";
import useSWR from "swr";
import fetcher from "../lib/fetcher";
import Loading from "../components/Loading";

/*

  ON-GOING:
  
  TEST:
    [] Log out throws error
    [] Rezervasyon kartı(Dines)
    [] Takvimin rezerve edilmiş günleri + butonu olmayacak ve ikon mikonla gösterilcek

  TODO:

    [] Günlük yemek inceleme, blue button
    [] Gün fonksiyonlarını UTC'ye çevir

*/

const Home: NextPage = (props: any) => {
  const { data, error } = useSWR("/api/dine", fetcher);
  const [value, onChange] = useState(new Date());
  const [cartModal, openCartModal] = useState(false);
  const [reservationModal, openreservationModal] = useState(false);
  const cart = useSelector((state: storeType) => state.cart);
  const user = useSelector((state: storeType) => state.user);
  const dispatch = useDispatch<any>();
  useEffect(() => {
    if (user.loggedIn) {
      dispatch(getCartItems());
    }
  }, []);

  const handleLogOut = async () => {
    signOut();
    return;
  };

  if (error) return <Loading />;
  if (!data) return <Loading />;
  return (
    <Layout>
      {/* User component */}
      <section className="flex flex-row gap-x-4 bg-neutral-900 p-2">
        {cartModal && <CartModal openModal={openCartModal} />}
        {reservationModal && (
          <ReservationModal openModal={openreservationModal} />
        )}
        <div className="h-16 min-h-[4rem] w-16 min-w-[4rem] rounded-full bg-neutral-600"></div>
        <div className="flex w-full flex-row justify-between gap-1 text-neutral-200">
          <div className="flex flex-col gap-y-1">
            <h1 className="text-lg font-semibold ">{user.name}</h1>
            <h4 className="text-sm">{user.civId}</h4>
            <h4 className="text-sm">{user.department}</h4>
          </div>

          <div className="flex h-full w-fit flex-col gap-4 lg:m-2 lg:flex-row lg:gap-x-4 ">
            <button
              onClick={() => openreservationModal(true)}
              className="flex h-8 w-full  cursor-pointer flex-row items-center justify-between border-b-2  border-yellow-600 px-1 transition-all hover:bg-neutral-700 lg:min-w-[4rem] lg:px-3">
              <div className="flex flex-row items-center gap-x-[0.35rem]">
                <FaHamburger size={14} className="mb-[2px] text-neutral-400" />
                <h1 className="hidden text-end text-sm font-semibold text-neutral-400 lg:block">
                  Reserved
                </h1>
              </div>
              <h4 className="rounded-full p-[0.15rem] px-1  text-center text-sm font-semibold text-neutral-200 lg:ml-2">
                {user.reservation.length}
              </h4>
            </button>

            <button
              onClick={() => openCartModal(true)}
              className="flex h-8 w-full cursor-pointer flex-row items-center justify-between gap-x-1 border-b-2  border-green-600 px-1 transition-all hover:bg-neutral-700 lg:min-w-[4rem] lg:px-3">
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
        <CustomCalendar data={data} />
      </section>
    </Layout>
  );
};

// export async function getStaticProps() {
//   const request = await fetch("/api/dine", {
//     method: "GET",
//   });
//   const data = await request.json();
//   return {
//     props: { data }, // will be passed to the page component as props
//   };
// }

export default Home;
