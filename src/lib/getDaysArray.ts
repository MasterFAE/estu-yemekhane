import { date } from "zod";
import daysInMonth from "./daysInMonth";
import getDayName from "./getDayName";

const getDaysArray = (month: number, year: number) => {
  let days: any[] = daysInMonth(month, year);
  console.log({ month });
  let startDay = _days.findIndex((e) => e == getDayName(days[0]));
  console.log(days[days.length - 1]);
  let endDay =
    4 - _days.findIndex((e) => e == getDayName(days[days.length - 1]));

  let beforeDays =
    month > 1 ? daysInMonth(month - 1, year) : daysInMonth(month, year - 1);
  let afterDays =
    month < 12 ? daysInMonth(month + 1, year) : daysInMonth(month, year + 1);
  console.log({ startDay, endDay });
  for (let i = 0; i < startDay; i++) {
    days.unshift(new Date(beforeDays[beforeDays.length - 1 - i]));
  }
  for (let i = 0; i < endDay; i++) {
    days.push(new Date(afterDays[i]));
  }
  console.log({ days: days[0] });
  return days;
};

export const _days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default getDaysArray;
