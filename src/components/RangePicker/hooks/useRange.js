import { useState, useEffect, useCallback } from "react";
import { getDateSplit } from "../utils/dateHalper";

export default function useRange(startDate, endDate) {
  const [range, setRange] = useState({ startDate, endDate });

  useEffect(() => setRange(() => ({ startDate, endDate })), [
    startDate,
    endDate,
  ]);

  const setStartDate = useCallback(
    (date) =>
      setRange((prev) => ({
        ...prev,
        startDate: date,
      })),
    []
  );

  const setEndDate = useCallback(
    (date) =>
      setRange((prev) => ({
        ...prev,
        endDate: date,
      })),
    []
  );

  const resetHandler = useCallback(
    () => setRange(() => ({ startDate: null, endDate: null })),
    [setRange]
  );

  const setTimeFromHandler = useCallback(
    (hour, minute, second) => {
      const { year, month, date } = getDateSplit(range.startDate);
      return setStartDate(new Date(year, month, date, hour, minute, second));
    },
    [setStartDate, range.startDate]
  );

  const setTimeToHandler = useCallback(
    (hour, minute, second) => {
      const { year, month, date } = getDateSplit(range.endDate);
      return setEndDate(new Date(year, month, date, hour, minute, second));
    },
    [setEndDate, range.endDate]
  );

  const setRangeHandler = (startDate, endDate) =>
    setRange(() => ({ startDate, endDate }));

  return {
    ...range,
    setRangeHandler,
    resetHandler,
    setTimeFromHandler,
    setTimeToHandler,
  };
}
