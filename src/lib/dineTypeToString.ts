const dineTypeToString = (type: string) => {
  switch (type) {
    case "BREAKFAST":
      return "Breakfast";
    case "DINE":
      return "Dine";
    case "LUNCH":
      return "Lunch";
    default:
      return "Unknown";
  }
};

export default dineTypeToString;
