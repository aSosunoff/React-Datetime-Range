import { useCallback, useMemo } from "react";
import useDateTimestamp from "./useDateTimestamp";
import useTime from "./useTime";

export default function useRange(startDate, endDate) {
  const {
    startDateTimestamp,
    endDateTimestamp,
    setDateTimestampRangeHandler,
    setStartDateTimestampHandler,
    setEndDateTimestampHandler,
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

    return {
      startDate:
        startDateTimestamp &&
        new Date(
          new Date(startDateTimestamp).setHours(
            ...getFormatTime(startTimeString)
          )
        ),
      endDate:
        endDateTimestamp &&
        new Date(
          new Date(endDateTimestamp).setHours(...getFormatTime(endTimeString))
        ),
    };
  }, [endDateTimestamp, endTimeString, startDateTimestamp, startTimeString]);

  return {
    /* Range */
    setDateTimestampRangeHandler,
    resetHandler,
    ...date,
    /* Date */
    startDateTimestamp,
    endDateTimestamp,
    setStartDateTimestampHandler,
    setEndDateTimestampHandler,
    /* Time */
    startTimeString,
    endTimeString,
    setStartTimeStringHandler,
    setEndTimeStringHandler,
  };
}
