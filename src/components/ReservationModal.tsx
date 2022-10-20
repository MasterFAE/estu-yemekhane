import React from "react";
import { FaHamburger, FaTrash } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import dineTypeToString from "../lib/dineTypeToString";
import getDayName from "../lib/getDayName";
import cart from "../pages/api/cart";
import { Dine_W_Food } from "../redux/cart/cartSlice";
import { storeType } from "../redux/store";
import ModalWrapper from "./ModalWrapper";

type Props = {
  openModal: any;
};

const ReservationModal = (props: Props) => {
  const reservation = useSelector((state: storeType) => state.user.reservation);
  return (
    <ModalWrapper>
      <div className="m-auto h-full w-full overflow-y-auto rounded-lg border border-neutral-900 bg-neutral-500 shadow-sm lg:mt-[5%] lg:h-3/4 lg:w-1/2">
        <div className="flex h-full w-full flex-col bg-neutral-600">
          <div className="flex justify-between gap-x-4 bg-neutral-900 px-4 py-3">
            <h1 className=" text-xl font-bold text-neutral-300">
              Your Reservations
            </h1>
            {reservation.length > 0 && (
              <h2 className="flex items-center text-center text-xs font-bold text-neutral-300">
                {reservation.length} Reservations
              </h2>
            )}
            <IoMdClose
              onClick={() => props.openModal(false)}
              className="ml-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-neutral-800 text-neutral-500 hover:bg-red-700 hover:text-red-400 focus:ring-2 focus:ring-neutral-300"
            />
          </div>
          <div className="flex h-full flex-col gap-y-2 overflow-auto bg-neutral-800 px-6 pt-4">
            {reservation.map((e) => {
              return (
                <div className="flex flex-row items-center rounded-lg rounded-l-sm border border-l-[3px] border-neutral-700 border-l-orange-500 bg-neutral-800 p-2 transition-all hover:bg-neutral-700">
                  <div className="ml-2 inline-flex h-8 w-8 flex-shrink-0 items-center justify-center self-start rounded-lg  bg-yellow-900 text-yellow-400">
                    <FaHamburger />
                  </div>
                  <div className="ml-3 text-base font-normal text-neutral-200">
                    <p className="border-b border-neutral-600">
                      {new Date(e.Dine.date).toLocaleString("en-En", {
                        day: "2-digit",
                        month: "2-digit",
                      })}{" "}
                      {getDayName(e.Dine.date)}
                      <br />
                      {dineTypeToString(e.Dine.type)} {e.Dine.cost || "5"}₺
                    </p>
                    <ul className="disc mt-1 w-fit max-w-[%60] list-inside list-disc text-neutral-300 lg:max-w-2xl lg:flex-row">
                      {e.Dine.foods.map((x: Food) => (
                        <li>{x.label}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
            {reservation.length === 0 && (
              <span className="rounded bg-yellow-200 p-2 text-center text-lg  font-semibold text-yellow-900">
                You don't have any reservation, create reservation
              </span>
            )}
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ReservationModal;
