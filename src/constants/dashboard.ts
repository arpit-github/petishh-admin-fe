import moment from "moment";

const DurationValue = [
  "today",
  "yesterday",
  "this_week",
  "last_week",
  "this_month",
  "last_month",
  "this_year",
  "last_year",
] as const;

type DurationValue = typeof DurationValue[number];

type DurationOptionType = { label: string; value: DurationValue };

export const dashboardDurationOptions: DurationOptionType[] = [
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "This week", value: "this_week" },
  { label: "Last Week", value: "last_week" },
  { label: "This Month", value: "this_month" },
  { label: "Last Month", value: "last_month" },
  { label: "This Year", value: "this_year" },
  { label: "Last Year", value: "last_year" },
];

const getFilterType = (selectedVal: DurationValue) => {
  switch (selectedVal) {
    case "today":
    case "yesterday":
    case "this_week":
    case "last_week":
      return "WEEK";
    case "this_month":
    case "last_month":
      return "MONTH";
    case "this_year":
    case "last_year":
      return "YEARLY";
    default:
      return "";
  }
};

const getDurationArray = (selectedVal: DurationValue) => {
  const arr = [];
  let startDate, finalDate;
  switch (selectedVal) {
    case "today":
      return [moment().format("YYYYMMDD")];
    case "yesterday":
      return [moment().subtract(1, "day").format("YYYYMMDD")];
    case "this_week":
      startDate = moment().startOf("week");
      finalDate = moment();
      while (startDate < finalDate) {
        arr.push(startDate.format("YYYYMMDD"));
        startDate = startDate.add(1, "day");
      }
      return arr;
    case "last_week":
      startDate = moment().startOf("week").subtract(1, "week");
      finalDate = moment().startOf("week");
      while (startDate < finalDate) {
        arr.push(startDate.format("YYYYMMDD"));
        startDate = startDate.add(1, "day");
      }
      return arr;
    case "this_month":
      return [moment().format("YYYYMM")];
    case "last_month":
      return [moment().subtract(1, "month").format("YYYYMM")];
    case "this_year":
      return [moment().format("YYYY")];
    case "last_year":
      return [moment().subtract(1, "year").format("YYYY")];
    default:
      return [];
  }
};

export const generateDashboardDateParamsString = (
  selectedVal: DurationValue
) => {
  const durationArray = getDurationArray(selectedVal);
  const filterType = getFilterType(selectedVal);
  let finalString = `filer=${filterType}`;

  durationArray.forEach((el) => {
    finalString += `&dates=${el}`;
  });

  return finalString;
};
