import getDayName from "./getDayName";
import { DaysItem, _days } from "./getDaysArray";

function daysInMonth<DaysItem>(month: number, year: number) {
  var date = new Date(year, month, 1);
  var days = [];
  while (date.getMonth() === month) {
    let dateName = getDayName(date.toDateString());
    if (dateName === _days[5]) {
      date.setDate(date.getDate() + 2);
      continue;
    } else if (dateName === _days[6]) {
      date.setDate(date.getDate() + 1);
      continue;
    }
    days.push({
      id: date.toLocaleDateString("en-CA"),
      date: new Date(date),
      dine: [],
    });
    const increase = dateName === _days[4] ? 3 : 1;
    date.setDate(date.getDate() + increase);
  }
  return days;
}

export default daysInMonth;
