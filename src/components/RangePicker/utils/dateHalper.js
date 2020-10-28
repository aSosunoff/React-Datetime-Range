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

export const getMonthNames = (locales) => {
  const month = [];
  for (let i = 0; i <= 11; i++) {
    month.push(new Date(1970, i, 1).toLocaleString(locales, { month: "long" }));
  }
  return month;
};

export const getYearList = () =>
  new Array(1031).fill(null).map((_, index) => index + 1970);

export const getDateSplit = (date) => ({
  year: date.getFullYear(),
  month: date.getMonth(),
  date: date.getDate(),
  hour: date.getHours(),
  minutes: date.getMinutes(),
  seconds: date.getSeconds(),
});

export const getWeek = (date) => {
  var onejan = new Date(date.getFullYear(), 0, 1);
  var millisecsInDay = 86400000;
  return Math.ceil(
    ((date.getTime() - onejan.getTime()) / millisecsInDay + date.getDay() + 1) /
      7
  );
};
