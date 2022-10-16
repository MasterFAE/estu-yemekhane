function getDayName(dateStr: string | Date) {
  var date = new Date(dateStr);
  return date.toLocaleDateString("en-EN", { weekday: "long" });
}
export default getDayName;
