import { useCallback, useMemo } from "react";
import {
  getDateWithoutTime,
  getMonthDayCount,
  getNumberFirsDayOfWeekByMonth,
} from "../utils/dateHalper";

export default function useDays(month, from, to) {
  const monthDayCount = useMemo(() => getMonthDayCount(month), [month]);

  const firsDayOfWeekByMonth = useMemo(
    () => getNumberFirsDayOfWeekByMonth(month),
    [month]
  );

  const fromLocal = useMemo(() => from && getDateWithoutTime(from), [from]);

  const toLocal = useMemo(() => to && getDateWithoutTime(to), [to]);

  const isFrom = useCallback(
    (date) => Boolean(fromLocal) && fromLocal.getTime() === date.getTime(),
    [fromLocal]
  );

  const isTo = useCallback(
    (date) => Boolean(toLocal) && toLocal.getTime() === date.getTime(),
    [toLocal]
  );

  const isBetween = useCallback(
    (date) =>
      Boolean(fromLocal) &&
      Boolean(toLocal) &&
      fromLocal.getTime() < date.getTime() &&
      date.getTime() < toLocal.getTime(),
    [fromLocal, toLocal]
  );

  const isCurrent = useCallback(
    (date) =>
      getDateWithoutTime(new Date()).getTime() ===
      getDateWithoutTime(date).getTime(),
    []
  );

  const days = useMemo(
    () =>
      new Array(monthDayCount).fill(null).map((_, index) => {
        const dayNumber = index + 1;

        const dateWithoutTime = new Date(
          month.getFullYear(),
          month.getMonth(),
          dayNumber
        );

        const isDay = (numberDay) => {
          const correctNumber = index + firsDayOfWeekByMonth;
          return (
            numberDay === correctNumber - Math.floor(correctNumber / 8) * 7
          );
        };

        return {
          dayNumber,
          date: dateWithoutTime,
          gridColumnStart: dayNumber === 1 ? firsDayOfWeekByMonth : null,
          type: isFrom(dateWithoutTime)
            ? "from"
            : isBetween(dateWithoutTime)
            ? "between"
            : isTo(dateWithoutTime)
            ? "to"
            : "",
          isCurrent: isCurrent(dateWithoutTime),
          isSaturday: isDay(6),
          isSunday: isDay(7),
        };
      }),
    [
      month,
      firsDayOfWeekByMonth,
      isBetween,
      isFrom,
      isTo,
      monthDayCount,
      isCurrent,
    ]
  );

  return {
    days,
  };
}
