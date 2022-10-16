import addDays from "./addDays";

function isInThePast(date: Date | string) {
  return date < addDays(1);
}

export default isInThePast;
