function addDays(days: number) {
  var date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}

export default addDays;
