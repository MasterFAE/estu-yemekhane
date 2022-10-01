function getDayName(dateStr: string) {
  var date = new Date(dateStr);
  return date.toLocaleDateString("en-EN", { weekday: "long" });
}
export default getDayName;
