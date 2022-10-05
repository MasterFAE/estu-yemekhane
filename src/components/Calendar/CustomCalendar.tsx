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
      <div className="gap-x flex flex-row self-center">
        {currentMonth > 0 && (
          <FaChevronLeft
            onClick={() => setcurrentMonth(currentMonth - 1)}
            className="cursor-pointer self-center"
            size={12}
          />
        )}
        <h1 className="w-24 select-none border-b-2 border-blue-300 text-center text-lg font-semibold text-neutral-200">
          {month[currentMonth]}
        </h1>
        {currentMonth < 11 && (
          <FaChevronRight
            onClick={() => setcurrentMonth(currentMonth + 1)}
            className="cursor-pointer  self-center"
            size={12}
          />
        )}
      </div>
      <div className="grid grid-cols-1 gap-2 rounded-lg bg-neutral-900 p-2 md:grid-cols-5">
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
