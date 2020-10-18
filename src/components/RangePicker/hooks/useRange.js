import { useState, useEffect, useCallback } from "react";

export default function useRange(startDate, endDate) {
  const [range, setRange] = useState({ startDate, endDate });

  useEffect(() => setRange({ startDate, endDate }), [startDate, endDate]);

  const setStartDate = useCallback(
    (date) =>
      setRange({
        startDate: date,
        endDate: range.endDate,
      }),
    [range.endDate]
  );

  const setEndDate = useCallback(
    (date) =>
      setRange({
        startDate: range.startDate,
        endDate: date,
      }),
    [range.startDate]
  );

  const rangeResetHandler = useCallback(
    () => setRange({ startDate: null, endDate: null }),
    [setRange]
  );

  const setTimeFromHandler = useCallback(
    (hour, minute, second) =>
      setStartDate(
        new Date(
          range.startDate.getFullYear(),
          range.startDate.getMonth(),
          range.startDate.getDate(),
          hour,
          minute,
          second
        )
      ),
    [setStartDate, range.startDate]
  );

  const setTimeToHandler = useCallback(
    (hour, minute, second) =>
      setEndDate(
        new Date(
          range.endDate.getFullYear(),
          range.endDate.getMonth(),
          range.endDate.getDate(),
          hour,
          minute,
          second
        )
      ),
    [setEndDate, range.endDate]
  );

  const setRangeHandler = (startDate, endDate) =>
    setRange({ startDate, endDate });

  return {
    ...range,
    setRangeHandler,
    rangeResetHandler,
    setTimeFromHandler,
    setTimeToHandler,
  };
}
