import { useState, useEffect, useCallback, useMemo } from "react";
import { getDateWithoutTime } from "../utils/dateHalper";

export default function useDateTimestamp(startDate, endDate) {
  const startDateTimestamp = useMemo(
    () => startDate && getDateWithoutTime(startDate).getTime(),
    [startDate]
  );

  const endDateTimestamp = useMemo(
    () => endDate && getDateWithoutTime(endDate).getTime(),
    [endDate]
  );

  const [rangeDate, setDateTimestampRange] = useState({
    startDateTimestamp,
    endDateTimestamp,
  });

  const setDateTimestampRangeHandler = (startDateTimestamp, endDateTimestamp) =>
    setDateTimestampRange(() => ({ startDateTimestamp, endDateTimestamp }));

  useEffect(
    () =>
      setDateTimestampRange(() => ({ startDateTimestamp, endDateTimestamp })),
    [startDateTimestamp, endDateTimestamp]
  );

  const setStartDateTimestampHandler = useCallback(
    (dateTimestamp) =>
      setDateTimestampRange((prev) => ({
        ...prev,
        startDateTimestamp: dateTimestamp,
      })),
    []
  );

  const setEndDateTimestampHandler = useCallback(
    (dateTimestamp) =>
      setDateTimestampRange((prev) => ({
        ...prev,
        endDateTimestamp: dateTimestamp,
      })),
    []
  );

  const resetHandler = useCallback(
    () =>
      setDateTimestampRange(() => ({
        startDateTimestamp: null,
        endDateTimestamp: null,
      })),
    []
  );

  return {
    ...rangeDate,
    setDateTimestampRangeHandler,
    setStartDateTimestampHandler,
    setEndDateTimestampHandler,
    resetHandler,
  };
}
