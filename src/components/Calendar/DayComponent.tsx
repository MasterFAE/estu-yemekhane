import { Dine, Food } from "@prisma/client";
import React from "react";
import { FaPlus, FaSearch, FaShoppingCart } from "react-icons/fa";
import daysInMonth from "../../lib/daysInMonth";
import getDayName from "../../lib/getDayName";

type Props = {
  day: any;
  dine: Dine & Food;
  dayNo: number;
};
// style={{ backgroundColor: "#EED5C1", color: "#0B0B0B" }}>
// style={{ backgroundColor: "#F7EEDC", color: "#0B0B0B" }}>
const DayComponent = (props: Props) => {
  const { dine, day } = props;
  return (
    <div className="group min-h-[16rem] w-full select-none rounded-lg bg-neutral-800  ">
      {day != 0 ? (
        <div className="flex h-full w-full flex-col justify-between truncate transition-all">
          <div className="flex flex-row items-center justify-center gap-x-1 border-b border-neutral-600 bg-neutral-800 p-2">
            <h1 className="text-left text-base font-bold uppercase text-neutral-200">
              {new Date(day).getDate()} - {getDayName(day)}
            </h1>
          </div>
          {dine ? (
            <>
              <ul className="h-full list-none">
                {dine.foods.map((food) => {
                  return <li className="food-label">{food.label}</li>;
                })}
              </ul>
              <div className="flex h-full w-full flex-row items-center justify-between gap-x-2 border-t border-neutral-900 bg-neutral-800 px-4 py-2">
                <div className="block w-fit cursor-pointer rounded-lg border border-emerald-700  px-4 py-2 transition-all hover:bg-green-700 group-hover:flex  ">
                  <FaPlus className="text-green-900" size={16} />
                </div>
                <div className="w-fit cursor-pointer items-center justify-center rounded-lg  border border-blue-600  px-4 py-2 transition-all hover:bg-blue-600 group-hover:flex">
                  <FaSearch className=" text-blue-900" size={16} />
                </div>
              </div>
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