import { date } from "zod";
import daysInMonth from "./daysInMonth";
import getDayName from "./getDayName";

const getDaysArray = (data: any[], month: number, year: number) => {
  let days: any[] = daysInMonth(month, year);
  let startDay = _days.findIndex((e) => e == getDayName(days[0].date));
  let endDay =
    4 - _days.findIndex((e) => e == getDayName(days[days.length - 1].date));

  let beforeDays =
    month > 1 ? daysInMonth(month - 1, year) : daysInMonth(month, year - 1);

  let afterDays =
    month < 12 ? daysInMonth(month + 1, year) : daysInMonth(month, year + 1);

  for (let i = 0; i < startDay; i++) {
    let date = new Date(beforeDays[beforeDays.length - 1 - i].date);
    days.unshift({
      id: date.toLocaleDateString("en-CA"),
      date: new Date(date),
    });
  }
  for (let i = 0; i < endDay; i++) {
    let date = new Date(afterDays[i].date);
    days.push({ id: date.toLocaleDateString("en-CA"), date: new Date(date) });
  }
  if (data) {
    data.forEach((element) => {
      let _id = element.date.split("T")[0];
      let index = days.findIndex((x) => x.id === _id);
      if (index == -1) return;
      days[index].dine = element;
    });
  }

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