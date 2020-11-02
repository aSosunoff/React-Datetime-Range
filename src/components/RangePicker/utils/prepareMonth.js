import {
  getCountWeek,
  getDateSplit,
  getMonthDayCount,
  getNumberFirsDayOfWeekByMonth,
} from "../utils/dateHalper";

export const prepareMonth = (date) => {
  const { year, month } = getDateSplit(date);

  const getDateTimestamp = (number) => new Date(year, month, number).getTime();

  return {
    days: new Array(getMonthDayCount(date))
      .fill(null)
      .map((_, index) => index + 1)
      .map((number) => ({
        number,
        date: new Date(getDateTimestamp(number)),
        dateTimestamp: getDateTimestamp(number),
      })),
    firsDayOfWeekByMonth: getNumberFirsDayOfWeekByMonth(date),
    weekCount: getCountWeek(date),
  };
};
