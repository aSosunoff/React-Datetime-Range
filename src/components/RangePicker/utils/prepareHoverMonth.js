export const prepareHoverMonth = (
  startDateTimestamp,
  endDateTimestamp,
  hoverDayTimestamp,
  monthPrapare
) => ({
  ...monthPrapare,
  days: monthPrapare.days.map((day) => ({
    ...day,
    isHoverBetween:
      (startDateTimestamp &&
        hoverDayTimestamp &&
        !endDateTimestamp &&
        ((startDateTimestamp < day.dateTimestamp &&
          day.dateTimestamp <= hoverDayTimestamp) ||
          (startDateTimestamp > day.dateTimestamp &&
            day.dateTimestamp >= hoverDayTimestamp))) ||
      false,
    isHoverStart: hoverDayTimestamp === day.dateTimestamp,
  })),
});
