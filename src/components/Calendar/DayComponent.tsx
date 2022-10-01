import React from "react";
import { FaPlus, FaSearch, FaShoppingCart } from "react-icons/fa";
import daysInMonth from "../../lib/daysInMonth";
import getDayName from "../../lib/getDayName";

type Props = {
  day: any;
  dayNo: number;
};
// style={{ backgroundColor: "#EED5C1", color: "#0B0B0B" }}>
// style={{ backgroundColor: "#F7EEDC", color: "#0B0B0B" }}>
const DayComponent = (props: Props) => {
  const { day } = props;
  return (
    <div className="group min-h-[18rem] w-full select-none rounded-lg bg-neutral-800  ">
      {day != 0 ? (
        <div className="flex w-full flex-col justify-between transition-all">
          <div className="flex flex-row items-center justify-center gap-x-1 border-b border-neutral-600 bg-neutral-800 p-2">
            <h1 className="text-left text-base font-bold uppercase text-neutral-200">
              {new Date(day).getDate()} - {getDayName(day)}
            </h1>
          </div>
          <ul className="list-none">
            <li className="food-label">Mercimek Çorbası</li>
            <li className="food-label">Tavuk But</li>
            <li className="food-label">Pilav</li>
            <li className="food-label">Ayran</li>
          </ul>
          <div className=" flex  flex-row  items-center  justify-center gap-x-2 border-t border-neutral-900 bg-neutral-800">
            <div className="w-fit cursor-pointer flex-row items-center justify-center rounded-lg border border-emerald-700 p-2 px-4 transition-all hover:bg-green-700 group-hover:flex  lg:hidden">
              <FaPlus className=" text-green-900" size={16} />
            </div>
            <div className="w-fit cursor-pointer items-center justify-center rounded-lg  border border-blue-600 p-2 px-4 transition-all hover:bg-blue-600 group-hover:flex  lg:hidden">
              <FaSearch className=" text-blue-900" size={16} />
            </div>
          </div>
        </div>
      ) : (
        <div className="h-full w-full cursor-not-allowed bg-neutral-50 transition-all"></div>
      )}
    </div>
  );
};

export default DayComponent;
