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

  const setDateTimestampRangeHandler = useCallback(
    (dateTimestamp) => {
      let from = null;
      let to = null;
      if (!rangeDate.startDateTimestamp || rangeDate.endDateTimestamp) {
        from = dateTimestamp;
      } else {
        const current = dateTimestamp;
        to = Math.max(current, rangeDate.startDateTimestamp);
        from = Math.min(current, rangeDate.startDateTimestamp);
      }

      setDateTimestampRange(() => ({
        startDateTimestamp: from,
        endDateTimestamp: to,
      }));
    },
    [rangeDate.endDateTimestamp, rangeDate.startDateTimestamp]
  );

  useEffect(
    () =>
      setDateTimestampRange(() => ({ startDateTimestamp, endDateTimestamp })),
    [startDateTimestamp, endDateTimestamp]
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
    resetHandler,
  };
}
