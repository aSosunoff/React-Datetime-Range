import { useCallback, useMemo } from "react";
import { useDayContext } from "../contexts/dayContext";
import {
  getDateWithoutTime,
  getMonthDayCount,
  getNumberFirsDayOfWeekByMonth,
} from "../utils/dateHalper";
import useDateSplit from "./useDateSplit";

export default function useCalendar(month, from, to) {
  const { year: yearSplit, month: monthSplit } = useDateSplit(month);

  const { hoverDay } = useDayContext();

  const monthDayCount = useMemo(() => getMonthDayCount(month), [month]);

  const firsDayOfWeekByMonth = useMemo(
    () => getNumberFirsDayOfWeekByMonth(month),
    [month]
  );

  const startRangeTimestamp = useMemo(
    () => from && getDateWithoutTime(from).getTime(),
    [from]
  );

  const endRangeTimestamp = useMemo(
    () => to && getDateWithoutTime(to).getTime(),
    [to]
  );

  const isStart = useCallback(
    (dateTimestamp) =>
      startRangeTimestamp && startRangeTimestamp === dateTimestamp,
    [startRangeTimestamp]
  );

  const isEnd = useCallback(
    (dateTimestamp) => endRangeTimestamp && endRangeTimestamp === dateTimestamp,
    [endRangeTimestamp]
  );

  const isBetween = useCallback(
    (dateTimestamp) =>
      startRangeTimestamp &&
      endRangeTimestamp &&
      startRangeTimestamp < dateTimestamp &&
      dateTimestamp < endRangeTimestamp,
    [startRangeTimestamp, endRangeTimestamp]
  );

  const isCurrent = useCallback(
    (dateTimestamp) =>
      getDateWithoutTime(new Date()).getTime() === dateTimestamp,
    []
  );

  // const week = () => Math.ceil((index + firsDayOfWeekByMonth) / 7)

  const days = useMemo(
    () =>
      new Array(monthDayCount).fill(null).map((_, index) => {
        const dayNumber = index + 1;

        const dateTimestamp = new Date(
          yearSplit,
          monthSplit,
          dayNumber
        ).getTime();

        return {
          dayNumber,
          date: new Date(dateTimestamp),
          dateTimestamp,
          gridColumnStart: dayNumber === 1 ? firsDayOfWeekByMonth : null,
          isStart: isStart(dateTimestamp),
          isBetween: isBetween(dateTimestamp),
          isEnd: isEnd(dateTimestamp),
          isCurrent: isCurrent(dateTimestamp),
        };
      }),
    [
      monthDayCount,
      yearSplit,
      monthSplit,
      firsDayOfWeekByMonth,
      isStart,
      isBetween,
      isEnd,
      isCurrent,
    ]
  );

  const daysHover = useMemo(() => {
    if (startRangeTimestamp && hoverDay && !endRangeTimestamp) {
      console.log(2);
      return days.map((day) => {
        const isHoverBetween =
          (startRangeTimestamp < day.dateTimestamp &&
            day.dateTimestamp <= hoverDay.getTime()) ||
          (startRangeTimestamp > day.dateTimestamp &&
            day.dateTimestamp >= hoverDay.getTime());

        return {
          ...day,
          isHoverStart: hoverDay && hoverDay.getTime() === day.dateTimestamp,
          isHoverBetween,
        };
      });
    }

    return days.map((day) => ({
      ...day,
      isHoverStart: hoverDay && hoverDay.getTime() === day.dateTimestamp,
      isHoverBetween: false,
    }));
  }, [days, endRangeTimestamp, hoverDay, startRangeTimestamp]);

  return {
    days: daysHover,
  };
}
