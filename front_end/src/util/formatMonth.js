import { format } from "date-fns";

const formatMonth = (date) => {
  var [year, month, day] = date.toString().split("-");

  var myday = day.split("T")[0];

  const mydate = format(new Date(year, month, myday), "	PPP");
  return mydate;
};

export default formatMonth;
