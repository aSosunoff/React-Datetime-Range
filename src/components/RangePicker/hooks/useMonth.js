import { useCallback, useMemo } from "react";
import {
  getDateWithoutTime,
  getMonthDayCount,
  getNumberFirsDayOfWeekByMonth,
} from "../utils/dateHalper";
import useDateSplit from "./useDateSplit";

export default function useCalendarTest(
  month,
  startRangeTimestamp,
  endRangeTimestamp
) {
  const { year: yearSplit, month: monthSplit } = useDateSplit(month);

  const firsDayOfWeekByMonth = useMemo(
    () => getNumberFirsDayOfWeekByMonth(month),
    [month]
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

  // const week = () => Math.ceil((index + firsDayOfWeekByMonth) / 7)

  const days = useMemo(
    () =>
      new Array(getMonthDayCount(month))
        .fill(null)
        .map((_, index) => index + 1)
        .map((number) => {
          const dateTimestamp = new Date(
            yearSplit,
            monthSplit,
            number
          ).getTime();

          return {
            number,
            date: new Date(dateTimestamp),
            dateTimestamp,
            isStart: isStart(dateTimestamp),
            isBetween: isBetween(dateTimestamp),
            isEnd: isEnd(dateTimestamp),
            isThisDay: isThisDay(dateTimestamp),
          };
        }),
    [month, yearSplit, monthSplit, isStart, isBetween, isEnd, isThisDay]
  );

  return {
    firsDayOfWeekByMonth,
    days,
  };
}