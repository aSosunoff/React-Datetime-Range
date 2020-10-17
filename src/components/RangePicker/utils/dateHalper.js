export const getNextMonthFromDate = (startDate, index) =>
  new Date(startDate.getFullYear(), startDate.getMonth() + index, 1);

export const getNextMonth = (date) =>
  new Date(date.getFullYear(), date.getMonth() + 1, 1);

export const getPrevMonth = (date) =>
  new Date(date.getFullYear(), date.getMonth() - 1, 1);

export const getMonthDayCount = (date) =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

export const getNumberFirsDayOfWeekByMonth = (date) => {
  const day = new Date(date.getFullYear(), date.getMonth()).getDay();

  return day === 0 ? 7 : day;
};

export const getDateWithoutTime = (date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

export const getWeeksNameLocales = (locales) => {
  const weekLine = [];
  for (let i = 5; i <= 11; i++) {
    weekLine.push(
      new Date(1970, 0, i).toLocaleString(locales, { weekday: "short" })
    );
  }
  return weekLine;
};
