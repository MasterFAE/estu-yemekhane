import React, { useState, useEffect } from "react";
import daysInMonth from "../../lib/daysInMonth";
import DayComponent from "./DayComponent";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import getDaysArray from "../../lib/getDaysArray";

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
  const [days, setDays] = useState(
    getDaysArray(props.data, currentMonth, date.getFullYear())
  );
  useEffect(() => {
    setDays(getDaysArray(props.data, currentMonth, date.getFullYear()));
  }, [currentMonth]);
  return (
    <div className="flex flex-col">
      <div className="flex w-fit flex-row justify-between gap-x-2 self-center">
        {currentMonth > 0 ? (
          <FaChevronLeft
            onClick={() => setcurrentMonth(currentMonth - 1)}
            className="cursor-pointer self-center text-neutral-200"
            size={16}
          />
        ) : (
          <FaChevronLeft
            className="cursor-not-allowed self-center text-neutral-500"
            size={16}
          />
        )}
        <h1 className="w-32 select-none border-b-2 border-blue-300 text-center text-[1.5rem] font-semibold text-neutral-200">
          {month[currentMonth]}
        </h1>
        {currentMonth < 11 ? (
          <FaChevronRight
            onClick={() => setcurrentMonth(currentMonth + 1)}
            className="cursor-pointer  self-center text-neutral-200"
            size={16}
          />
        ) : (
          <FaChevronRight
            className="cursor-not-allowed self-center text-neutral-500"
            size={16}
          />
        )}
      </div>
      <div className="mt-2 grid grid-cols-1 gap-2 rounded-lg bg-neutral-900 p-2 md:grid-cols-5">
        {days.map((element, key) => {
          return (
            <DayComponent
              day={element.date}
              dine={element.dine}
              key={element.id}
              dayNo={key + 1}></DayComponent>
          );
        })}
      </div>
    </div>
  );
};

export default CustomCalendar;
