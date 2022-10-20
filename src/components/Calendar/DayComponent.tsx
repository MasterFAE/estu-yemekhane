import { DINEHOURS, ReservedDine } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { FaPlus, FaSearch, FaTicketAlt } from "react-icons/fa";
import { MdClose, MdDone } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import addSystemMessage from "../../lib/addSystemMessage";
import getDayName from "../../lib/getDayName";
import isInThePast from "../../lib/isInThePast";
import {
  deleteItem,
  Dine_W_Food,
  getCartItems,
} from "../../redux/cart/cartSlice";
import { storeType } from "../../redux/store";
import { SystemMessageType } from "../../redux/system-message/systemMessageSlice";

type Props = {
  day: any;
  dine: Dine_W_Food[];
  dayNo: number;
  dineType: typeof DINEHOURS | string;
};

const DayComponent = (props: Props) => {
  const { dineType, dine, day } = props;
  const [renderDine, setrenderDine] = useState<Dine_W_Food | null>(null);
  //Sets the loading to the buttons
  const [loadingaction, setAction] = useState(false);
  const dispatch = useDispatch();

  const [owned, setOwned] = useState(false);
  const [inCart, setInCart] = useState(false);
  const cart = useSelector((state: storeType) => state.cart);
  const reservation: ReservedDine[] = useSelector(
    (state: storeType) => state.user.reservation
  );

  useEffect(() => {
    if (dine.length === 0) return;
    setInCart(cart.dine.filter((e) => e.id === renderDine?.id).length > 0);
  }, [cart]);

  useEffect(() => {
    if (dine.length === 0) return;
    setOwned(reservation.filter((e) => e.dineId === renderDine?.id).length > 0);
  }, [reservation]);

  useEffect(() => {
    if (dine.length === 0) {
      setrenderDine(null);
      return;
    }
    const selectedDine = dine.find((e) => e.type === dineType);
    setrenderDine(selectedDine);
    setInCart(cart.dine.filter((e) => e.id === selectedDine?.id).length > 0);
    setOwned(
      reservation.filter((e) => e.dineId === selectedDine?.id).length > 0
    );
  }, [dineType]);

  const deleteFromCart = async () => {
    setAction(true);
    const response = await fetch(`api/cart/${renderDine?.id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      addSystemMessage(dispatch, {
        type: SystemMessageType.ERROR,
        message: "Error",
        title: "Error has occurred while deleting item.",
      });
      setAction(false);

      return;
    }
    addSystemMessage(dispatch, {
      type: SystemMessageType.INFO,
      title: "Info",
      message: "Item has deleted from your cart",
    });
    dispatch(deleteItem({ id: renderDine?.id }));
    setAction(false);
  };

  const addCart = async () => {
    setAction(true);

    const result = await fetch(`api/cart/${renderDine?.id}`, {
      method: "POST",
    });
    let data = await result.json();
    if (!result.ok) {
      addSystemMessage(dispatch, {
        type: SystemMessageType.ERROR,
        message: data.error,
        title: "Error has occurred",
      });
      setAction(false);
      return;
    }

    addSystemMessage(dispatch, {
      type: SystemMessageType.SUCCESS,
      title: "Added to your cart",
      message: "You added an item to your cart.",
    });
    //@ts-ignore
    dispatch(getCartItems());
    setAction(false);
  };

  return (
    <div className="day-item">
      {day != 0 ? (
        <div className="flex h-full w-full flex-col justify-between truncate transition-all">
          <div className="flex flex-row items-center justify-center gap-x-1 border-b border-neutral-600 bg-neutral-800 p-2">
            {/* If purchased change the color here by conditional rendering */}
            <h1 className="text-left text-base font-bold uppercase text-neutral-200">
              {new Date(day).getDate()} - {getDayName(day)}
            </h1>
          </div>
          {renderDine ? (
            <>
              <ul className="h-full list-none">
                {renderDine.foods.map((food) => {
                  return (
                    <li className="food-label" key={food.label}>
                      {food.label}
                    </li>
                  );
                })}
              </ul>
              {!isInThePast(day) ? (
                <div className="flex h-full w-full flex-row items-center justify-between gap-x-2 border-t border-neutral-900 bg-neutral-800 px-4 py-2">
                  {owned ? (
                    <button
                      disabled
                      className="block w-fit rounded-lg bg-yellow-600 px-4 py-2 ">
                      <FaTicketAlt size={16} className="text-neutral-900" />
                    </button>
                  ) : (
                    <div className="transition-all">
                      {inCart ? (
                        <button
                          disabled={loadingaction}
                          onClick={deleteFromCart}
                          style={{
                            cursor: !loadingaction ? "pointer" : "wait",
                          }}
                          className="items-center justify-center rounded-lg border border-red-700 bg-neutral-800 px-4 py-2 text-red-700 transition-all hover:border-red-800 hover:bg-red-800 hover:text-red-400 focus:ring-2 focus:ring-neutral-300">
                          <MdClose size={16} />
                        </button>
                      ) : (
                        <button
                          disabled={loadingaction}
                          onClick={addCart}
                          style={{
                            cursor: !loadingaction ? "pointer" : "wait",
                          }}
                          className="block w-fit  rounded-lg border border-emerald-700  px-4 py-2 transition-all hover:bg-green-700 ">
                          <FaPlus className="text-green-900" />
                        </button>
                      )}
                    </div>
                  )}

                  <div className="w-fit cursor-pointer items-center justify-center rounded-lg  border border-blue-600  px-4 py-2 transition-all hover:bg-blue-600">
                    <FaSearch className=" text-blue-900" size={16} />
                  </div>
                </div>
              ) : (
                <div className="flex h-full w-full flex-row items-center justify-between gap-x-2 border-t border-neutral-900 bg-neutral-800 px-4 py-2"></div>
              )}
            </>
          ) : (
            <div className="h-full">
              <h1 className="food-label text-sm text-neutral-500">
                Menu is not ready for this day
              </h1>
            </div>
          )}
        </div>
      ) : (
        <div className="h-full w-full cursor-not-allowed bg-neutral-50 transition-all"></div>
      )}
    </div>
  );
};

export default DayComponent;
