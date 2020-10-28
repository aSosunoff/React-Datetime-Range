import { useCallback, useMemo } from "react";
import { useDayContext } from "../contexts/dayContext";
import {
  getDateSplit,
  getDateWithoutTime,
  getMonthDayCount,
  getNextMonth,
  getNumberFirsDayOfWeekByMonth,
  getPrevMonth,
} from "../utils/dateHalper";
import useDateSplit from "./useDateSplit";

export default function useCalendar(month, from, to) {
  const { year: yearSplit, month: monthSplit } = useDateSplit(month);

  const { hoverDay } = useDayContext();

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

  const isThisDay = useCallback(
    (dateTimestamp) =>
      getDateWithoutTime(new Date()).getTime() === dateTimestamp,
    []
  );

  const mapDay = useCallback((day) => {
    return {
      dayNumber: 0,
      date: null,
      dateTimestamp: 0,
      gridColumnStart: null,
      isStart: false,
      isBetween: false,
      isEnd: false,
      isThisDay: false,
      isCurrentMonth: false,
      ...day,
    };
  }, []);

  // const week = () => Math.ceil((index + firsDayOfWeekByMonth) / 7)
  const prevDays = useMemo(() => {
    const prevMonth = getPrevMonth(month);
    const { year: prevYearSplit, month: prevMonthSplit } = getDateSplit(
      prevMonth
    );
    const prevCountDays = getMonthDayCount(prevMonth);
    const startIndex = prevCountDays - (firsDayOfWeekByMonth - 1);
    const countDayBalance = prevCountDays - startIndex;

    return Array(countDayBalance)
      .fill()
      .map((_, index) => index + startIndex + 1)
      .map((dayNumber) => {
        const date = new Date(prevYearSplit, prevMonthSplit, dayNumber);
        return mapDay({
          dayNumber,
          date,
          dateTimestamp: date.getTime(),
        });
      });
  }, [month, firsDayOfWeekByMonth, mapDay]);

  const currentDays = useMemo(
    () =>
      new Array(getMonthDayCount(month))
        .fill(null)
        .map((_, index) => index + 1)
        .map((dayNumber) => {
          const dateTimestamp = new Date(
            yearSplit,
            monthSplit,
            dayNumber
          ).getTime();

          return mapDay({
            dayNumber,
            date: new Date(dateTimestamp),
            dateTimestamp,
            gridColumnStart: dayNumber === 1 ? firsDayOfWeekByMonth : null,
            isStart: isStart(dateTimestamp),
            isBetween: isBetween(dateTimestamp),
            isEnd: isEnd(dateTimestamp),
            isThisDay: isThisDay(dateTimestamp),
            isCurrentMonth: true,
          });
        }),
    [
      month,
      yearSplit,
      monthSplit,
      mapDay,
      firsDayOfWeekByMonth,
      isStart,
      isBetween,
      isEnd,
      isThisDay,
    ]
  );

  const nextDays = useMemo(() => {
    const nextMonth = getNextMonth(month);
    const { year: nextYearSplit, month: nextMonthSplit } = getDateSplit(
      nextMonth
    );
    const nextFirsDayOfWeekByMonth = getNumberFirsDayOfWeekByMonth(nextMonth);

    if (nextFirsDayOfWeekByMonth !== 1) {
      return new Array(8 - nextFirsDayOfWeekByMonth)
        .fill()
        .map((_, i) => i + 1)
        .map((dayNumber) => {
          const date = new Date(nextYearSplit, nextMonthSplit, dayNumber);
          return mapDay({
            dayNumber,
            date,
            dateTimestamp: date.getTime(),
          });
        });
    }

    return [];
  }, [month, mapDay]);

  const daysHover = useMemo(() => {
    if (startRangeTimestamp && hoverDay && !endRangeTimestamp) {
      return currentDays.map((day) => {
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

    return currentDays.map((day) => ({
      ...day,
      isHoverStart: hoverDay && hoverDay.getTime() === day.dateTimestamp,
      isHoverBetween: false,
    }));
  }, [currentDays, endRangeTimestamp, hoverDay, startRangeTimestamp]);

  return {
    days: [...prevDays, ...daysHover, ...nextDays].map((day, index) => ({
      ...day,
      index,
    })),
  };
}
