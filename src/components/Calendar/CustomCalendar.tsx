import React, { useState, useEffect, useId } from "react";
import daysInMonth from "../../lib/daysInMonth";
import DayComponent from "./DayComponent";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import getDaysArray, { DaysItem } from "../../lib/getDaysArray";
import { DINEHOURS } from ".prisma/client";
import { useDispatch, useSelector } from "react-redux";
import { storeType } from "../../redux/store";
import { getReservation } from "../../redux/user/userSlice";

type Props = { data: any[] };
const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const CustomCalendar = (props: Props) => {
  const date = new Date();
  const [currentMonth, setcurrentMonth] = useState(date.getMonth());
  const [dineType, selectDineType] = useState(DINEHOURS.BREAKFAST);
  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(getReservation());
  }, []);

  const [days, setDays] = useState<DaysItem>(
    getDaysArray(props.data, currentMonth, date.getFullYear())
  );

  useEffect(() => {
    setDays(getDaysArray(props.data, currentMonth, date.getFullYear()));
  }, [currentMonth]);
  return (
    <div className="flex flex-col">
      <div className="flex w-fit flex-row justify-between gap-x-2 self-center">
        {currentMonth > 0 ? (
          <div
            onClick={() => setcurrentMonth(currentMonth - 1)}
            className="flex h-fit cursor-pointer self-center rounded-full bg-neutral-600 p-[0.3rem] text-neutral-200 transition-all hover:bg-neutral-500 focus:bg-neutral-700">
            <FaChevronLeft size={16} />
          </div>
        ) : (
          <div className="flex h-fit cursor-pointer self-center rounded-full bg-neutral-600 p-[0.3rem] text-neutral-200 transition-all hover:bg-neutral-500 focus:bg-neutral-700">
            <FaChevronLeft size={16} />
          </div>
        )}
        <div className="flex flex-col">
          <h1 className="w-32 select-none rounded-sm border-b-2 border-blue-300 text-center text-[1.5rem] font-semibold text-neutral-200">
            {month[currentMonth]}
          </h1>

          <select
            defaultValue={DINEHOURS.BREAKFAST}
            onChange={(e) => selectDineType(e.target.value)}
            className="mt-2 block w-fit self-center rounded-lg  border border-neutral-600 bg-neutral-700 py-[0.1rem] text-center text-sm text-white placeholder-neutral-400 focus:border-blue-500 focus:ring-blue-500">
            <option value={DINEHOURS.BREAKFAST}>{DINEHOURS.BREAKFAST}</option>
            <option value={DINEHOURS.LUNCH}>{DINEHOURS.LUNCH}</option>
            <option value={DINEHOURS.DINNER}>{DINEHOURS.DINNER}</option>
          </select>
        </div>
        {currentMonth < 11 ? (
          <div
            onClick={() => setcurrentMonth(currentMonth + 1)}
            className="flex h-fit cursor-pointer self-center rounded-full bg-neutral-600 p-[0.3rem] text-neutral-200 transition-all hover:bg-neutral-500 focus:bg-neutral-700">
            <FaChevronRight size={16} />
          </div>
        ) : (
          <div className="flex h-fit cursor-not-allowed self-center rounded-full bg-neutral-600 p-[0.3rem] text-neutral-200 transition-all hover:bg-neutral-500 focus:bg-neutral-700">
            <FaChevronRight size={16} />
          </div>
        )}
      </div>
      <div className="mt-2 grid grid-cols-1 gap-2 rounded-lg bg-neutral-900 p-2 md:grid-cols-5">
        {days.map((element, key) => {
          return (
            <DayComponent
              dineType={dineType}
              day={element.date}
              dine={element.dine}
              key={useId()}
              dayNo={key + 1}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CustomCalendar;
