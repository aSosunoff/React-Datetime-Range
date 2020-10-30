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

  return {
    /* Range */
    resetHandler,
    ...date,
    /* Date */
    startDateTimestamp,
    endDateTimestamp,
    setDateTimestampRangeHandler,
    /* Time */
    startTimeString,
    endTimeString,
    setStartTimeStringHandler,
    setEndTimeStringHandler,
  };
}
