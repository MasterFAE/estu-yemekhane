import React, { useState } from "react";
import { FaHamburger, FaTrash } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import addSystemMessage from "../lib/addSystemMessage";
import dineTypeToString from "../lib/dineTypeToString";
import getDayName from "../lib/getDayName";
import { deleteItem, Dine_W_Food } from "../redux/cart/cartSlice";
import { storeType } from "../redux/store";
import { SystemMessageType } from "../redux/system-message/systemMessageSlice";
import { getReservation } from "../redux/user/userSlice";
import ModalWrapper from "./ModalWrapper";

type Props = {
  openModal: any;
};

/* 
  TODO:
  * Every day converter must be integrated to UTC, DUE TO: it shows 1 day later in carts
*/

const CartModal = (props: Props) => {
  const cart = useSelector((state: storeType) => state.cart);
  const [purchasing, setPurchasing] = useState(false);

  const dispatch = useDispatch<any>();

  const purchase = async () => {
    setPurchasing(true);
    const response = await fetch(`/api/cart`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cart),
    });
    if (!response.ok) {
      addSystemMessage(dispatch, {
        type: SystemMessageType.ERROR,
        message: "Error",
        title: "Error has occurred while purchasing.",
      });
      setPurchasing(false);
      return;
    }

    cart.dine.forEach((e) => {
      dispatch(deleteItem({ id: e.id }));
    });
    addSystemMessage(dispatch, {
      type: SystemMessageType.SUCCESS,
      title: "Purchased.",
      message: "Successful",
    });
    dispatch(getReservation());
    setPurchasing(false);
  };

  const deleteFromCart = async (id: number) => {
    const response = await fetch(`/api/cart/${id}`, { method: "DELETE" });
    if (!response.ok) {
      addSystemMessage(dispatch, {
        type: SystemMessageType.ERROR,
        message: "Error",
        title: "Error has occurred while deleting item.",
      });
      return;
    }
    dispatch(deleteItem({ id }));
  };

  return (
    <ModalWrapper>
      <div className="m-auto h-full w-full overflow-y-auto rounded-lg border border-neutral-900 bg-neutral-500 shadow-sm lg:mt-[5%] lg:h-3/4 lg:w-1/2">
        <div className="flex h-full w-full flex-col bg-neutral-600">
          <div className="flex justify-between gap-x-4 bg-neutral-900 px-4 py-3">
            <h1 className=" text-xl font-bold text-neutral-300">Your Cart</h1>
            {cart.dine.length > 0 && (
              <h2 className="flex items-center text-center text-xs font-bold text-neutral-300">
                {cart.dine.length} Reservations
              </h2>
            )}
            <IoMdClose
              onClick={() => props.openModal(false)}
              className="ml-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-neutral-800 text-neutral-500 hover:bg-red-700 hover:text-red-400 focus:ring-2 focus:ring-neutral-300"
            />
          </div>
          <div className="flex h-full flex-col gap-y-2 overflow-auto bg-neutral-800 px-6 pt-4">
            {cart.dine.map((e: Dine_W_Food) => {
              return (
                <div className="flex flex-row items-center rounded-lg rounded-l-sm border border-l-[3px] border-neutral-700 border-l-orange-500 bg-neutral-800 p-2 transition-all hover:bg-neutral-700">
                  <div className="ml-2 inline-flex h-8 w-8 flex-shrink-0 items-center justify-center self-start rounded-lg  bg-yellow-900 text-yellow-400">
                    <FaHamburger />
                  </div>
                  <div className="ml-3 text-base font-normal text-neutral-200">
                    <p className="border-b border-neutral-600">
                      {new Date(e.date).toLocaleString("en-En", {
                        day: "2-digit",

                        month: "2-digit",
                      })}{" "}
                      {getDayName(e.date)}
                      <br />
                      {dineTypeToString(e.type)} {e.cost || "5"}₺
                    </p>
                    <ul className="disc mt-1 w-fit max-w-[%60] list-inside list-disc text-neutral-300 lg:max-w-2xl lg:flex-row">
                      {e.foods.map((x) => (
                        <li>{x.label}</li>
                      ))}
                    </ul>
                  </div>
                  <button
                    type="button"
                    onClick={() => deleteFromCart(e.id)}
                    className="ml-auto flex h-8 w-8 items-center justify-center self-start rounded-lg bg-neutral-800 text-neutral-500 hover:text-white focus:ring-2 focus:ring-neutral-300"
                    aria-label="Close">
                    <span className="sr-only">Close</span>
                    <FaTrash />
                  </button>
                </div>
              );
            })}

            {/* Buy button */}
            {cart.dine.length > 0 ? (
              <div className="flex w-full items-center justify-center border-t-neutral-600 p-4">
                <button
                  type="button"
                  disabled={purchasing}
                  onClick={purchase}
                  className="w-full rounded-lg bg-green-600  py-2.5 text-base font-medium text-white hover:bg-green-700  focus:outline-none focus:ring-4 focus:ring-green-800">
                  {!purchasing ? `Pay ${cart.total}₺` : "Processing..."}
                </button>
              </div>
            ) : (
              <span className="rounded bg-yellow-200 p-2 text-center text-lg  font-semibold text-yellow-900">
                Your cart is empty, create reservation
              </span>
            )}
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default CartModal;
