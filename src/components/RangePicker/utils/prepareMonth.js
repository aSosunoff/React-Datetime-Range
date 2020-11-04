import {
  getCountWeek,
  getDateSplit,
  getMonthDayCount,
  getNumberFirsDayOfWeekByMonth,
} from "../utils/dateHalper";

export const prepareMonth = (date) => {
  const { year, month } = getDateSplit(date);

  return {
    days: new Array(getMonthDayCount(date))
      .fill(null)
      .map((_, index) => index + 1)
      .map((number) => ({
        number,
        dateTimestamp: new Date(year, month, number).getTime(),
      })),
    firsDayOfWeekByMonth: getNumberFirsDayOfWeekByMonth(date),
    weekCount: getCountWeek(date),
  };
};
