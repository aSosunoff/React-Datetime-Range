import { useCallback, useMemo } from "react";
import { getDateWithoutTime } from "../utils/dateHalper";
import useMonth from "./useMonth";

export default function useMonthRange(
  month,
  startRangeTimestamp,
  endRangeTimestamp
) {
  const monthPrapare = useMonth(month);

  const isStart = useCallback(
    (dateTimestamp) => startRangeTimestamp === dateTimestamp,
    [startRangeTimestamp]
  );

  const isEnd = useCallback(
    (dateTimestamp) => endRangeTimestamp === dateTimestamp,
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

  const days = useMemo(
    () =>
      monthPrapare.days.map((day) => ({
        ...day,
        isStart: isStart(day.dateTimestamp),
        isBetween: isBetween(day.dateTimestamp),
        isEnd: isEnd(day.dateTimestamp),
        isThisDay: isThisDay(day.dateTimestamp),
      })),
    [monthPrapare, isStart, isBetween, isEnd, isThisDay]
  );

  return {
    ...monthPrapare,
    days,
  };
}
