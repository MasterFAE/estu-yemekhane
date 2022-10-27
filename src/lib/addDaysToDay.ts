function addDaysToDay(input: Date, addition: number) {
  var date = new Date(input);
  date.setDate(date.getDate() + addition);
  return date;
}

export default addDaysToDay;
