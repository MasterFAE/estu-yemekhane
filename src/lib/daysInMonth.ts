import getDayName from "./getDayName";
import { _days } from "./getDaysArray";

function daysInMonth(month: number, year: number) {
  var date = new Date(year, month, 1);
  var days = [];
  while (date.getMonth() === month) {
    let dateName = date.toDateString();
    if (getDayName(dateName) === _days[5]) {
      date.setDate(date.getDate() + 2);
      continue;
    }
    if (getDayName(dateName) === _days[6]) {
      date.setDate(date.getDate() + 1);
      continue;
    }
    days.push({ id: date.toLocaleDateString("en-CA"), date: new Date(date) });
    date.setDate(date.getDate() + 1);
  }
  return days;
}

export default daysInMonth;
