import { useCallback, useMemo } from "react";
import useDateTimestamp from "./useDateTimestamp";
import useTime from "./useTime";

export default function useRange(startDate, endDate) {
  const {
    startDateTimestamp,
    endDateTimestamp,
    setDateTimestampRangeHandler,
    resetHandler: resetDateHandler,
  } = useDateTimestamp(startDate, endDate);

  const {
    startTimeString,
    endTimeString,
    setStartTimeStringHandler,
    setEndTimeStringHandler,
    resetHandler: resetTimeHandler,
  } = useTime(startDate, endDate);

  const resetHandler = useCallback(() => {
    resetDateHandler();
    resetTimeHandler();
  }, [resetDateHandler, resetTimeHandler]);

  const date = useMemo(() => {
    const getFormatTime = (value) => {
      const [hour = 0, minute = 0, second = 0] = value.split(":").map(Number);

      return [hour, minute, second];
    };

    let startDate = null;

    if (startDateTimestamp && !startTimeString) {
      startDate = new Date(startDateTimestamp);
    } else if (startDateTimestamp && startTimeString) {
      startDate = new Date(
        new Date(startDateTimestamp).setHours(...getFormatTime(startTimeString))
      );
    }

    let endDate = null;

    if (endDateTimestamp && !endTimeString) {
      endDate = new Date(endDateTimestamp);
    } else if (endDateTimestamp && endTimeString) {
      endDate = new Date(
        new Date(endDateTimestamp).setHours(...getFormatTime(endTimeString))
      );
    }

    return {
      startDate,
      endDate,
    };
  }, [endDateTimestamp, endTimeString, startDateTimestamp, startTimeString]);

  const setRangeHandler = useCallback(
    (dateTimestamp) => {
      let from = null;
      let to = null;
      if (!startDateTimestamp || endDateTimestamp) {
        from = dateTimestamp;
        resetTimeHandler();
      } else {
        const current = dateTimestamp;
        to = Math.max(current, startDateTimestamp);
        from = Math.min(current, startDateTimestamp);
      }

      setDateTimestampRangeHandler(from, to);
    },
    [
      endDateTimestamp,
      setDateTimestampRangeHandler,
      resetTimeHandler,
      startDateTimestamp,
    ]
  );

  return {
    /* Range */
    resetHandler,
    ...date,
    /* Date */
    startDateTimestamp,
    endDateTimestamp,
    setRangeHandler,
    /* Time */
    startTimeString,
    endTimeString,
    setStartTimeStringHandler,
    setEndTimeStringHandler,
  };
}
