import { format } from "date-fns";

const formatDate = (date) => {
  var [year, month, day] = date.toString().split("-");

  var myday = day.split('T')[0];
  const hour = day.split('T')[1].split(':')[0];
  const min = day.split('T')[1].split(':')[1]

  const mydate = format(new Date(year, month, myday, hour, min), "PPp");
  return mydate;
};

export default formatDate;
