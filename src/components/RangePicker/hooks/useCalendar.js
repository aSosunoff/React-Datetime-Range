import { useCallback, useMemo } from "react";
import { useDayContext } from "../contexts/dayContext";
import {
  getDateWithoutTime,
  getMonthDayCount,
  getNumberFirsDayOfWeekByMonth,
} from "../utils/dateHalper";

export default function useCalendar(month, from, to) {
  const { hoverDay } = useDayContext();

  const monthDayCount = useMemo(() => getMonthDayCount(month), [month]);

  const firsDayOfWeekByMonth = useMemo(
    () => getNumberFirsDayOfWeekByMonth(month),
    [month]
  );

  const fromLocal = useMemo(() => from && getDateWithoutTime(from), [from]);

  const toLocal = useMemo(() => to && getDateWithoutTime(to), [to]);

  const isStart = useCallback(
    (date) => Boolean(fromLocal) && fromLocal.getTime() === date.getTime(),
    [fromLocal]
  );

  const isEnd = useCallback(
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

  // const week = () => Math.ceil((index + firsDayOfWeekByMonth) / 7)

  const days = useMemo(
    () =>
      new Array(monthDayCount).fill(null).map((_, index) => {
        const dayNumber = index + 1;

        const dateWithoutTime = new Date(
          month.getFullYear(),
          month.getMonth(),
          dayNumber
        );

        const isHoverBetween =
          fromLocal && hoverDay && !toLocal
            ? (fromLocal.getTime() < dateWithoutTime.getTime() &&
                dateWithoutTime.getTime() <= hoverDay.getTime()) ||
              (fromLocal.getTime() > dateWithoutTime.getTime() &&
                dateWithoutTime.getTime() >= hoverDay.getTime())
            : false;

        return {
          dayNumber,
          date: dateWithoutTime,
          gridColumnStart: dayNumber === 1 ? firsDayOfWeekByMonth : null,
          isStart: isStart(dateWithoutTime),
          isBetween: isBetween(dateWithoutTime),
          isEnd: isEnd(dateWithoutTime),
          isCurrent: isCurrent(dateWithoutTime),
          isHoverStart:
            hoverDay && hoverDay.getTime() === dateWithoutTime.getTime(),
          isHoverBetween,
        };
      }),
    [
      monthDayCount,
      month,
      fromLocal,
      hoverDay,
      toLocal,
      firsDayOfWeekByMonth,
      isStart,
      isBetween,
      isEnd,
      isCurrent,
    ]
  );

  return {
    days,
  };
}
