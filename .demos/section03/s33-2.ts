let dayOfWeek = "Monday";
switch (dayOfWeek) {
  case "Saturday": case "Sunday":
    console.log("weekend");
    break;
  case "Monday": case "Tuesday":
  case "Wednesday": case "Thursday":
  case "Friday":
    console.log("weekday");
    break;
  default:
    console.log("invalid day");
}
