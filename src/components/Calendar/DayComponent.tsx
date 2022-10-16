import { Dine, DINEHOURS, Food } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { FaPlus, FaSearch, FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import addSystemMessage from "../../lib/addSystemMessage";
import daysInMonth from "../../lib/daysInMonth";
import getDayName from "../../lib/getDayName";
import isInThePast from "../../lib/isInThePast";
import { Dine_W_Food, getCartItems } from "../../redux/cart/cartSlice";
import { SystemMessageType } from "../../redux/system-message/systemMessageSlice";

type Props = {
  day: any;
  dine: Dine_W_Food[];
  dayNo: number;
  dineType: DINEHOURS;
};
// style={{ backgroundColor: "#F7EEDC", color: "#0B0B0B" }}>
const DayComponent = (props: Props) => {
  const { dineType, dine, day } = props;
  const [renderDine, setrenderDine] = useState<Dine_W_Food | null | undefined>(
    null
  );

  console.log({ day, is: isInThePast(day) });

  useEffect(() => {
    if (dine && dine.find((e) => e.type === dineType)) {
      setrenderDine(dine.find((e) => e.type === dineType));
      return;
    }
    setrenderDine(null);
  }, [dineType]);

  const dispatch = useDispatch();
  const addCart = async () => {
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
      return;
    }
    if (result.ok && !data.error) {
      //@ts-ignore
      dispatch(getCartItems());
    }
  };

  return (
    <div className="group min-h-[16rem] w-full select-none rounded-lg bg-neutral-800  ">
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
                  return <li className="food-label">{food.label}</li>;
                })}
              </ul>
              {!isInThePast(day) ? (
                <div className="flex h-full w-full flex-row items-center justify-between gap-x-2 border-t border-neutral-900 bg-neutral-800 px-4 py-2">
                  <div
                    onClick={addCart}
                    className="block w-fit cursor-pointer rounded-lg border border-emerald-700  px-4 py-2 transition-all hover:bg-green-700 ">
                    <FaPlus className="text-green-900" size={16} />
                  </div>
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
