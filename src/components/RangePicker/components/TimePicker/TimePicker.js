import React, { useMemo } from "react";
import styles from "./TimePicker.module.scss";
import { useRangeContext } from "../../contexts/rangeContext";

const TimePicker = () => {
  const {
    startDateTimestamp,
    endDateTimestamp,
    startTimeString,
    endTimeString,
    setStartTimeStringHandler,
    setEndTimeStringHandler,
  } = useRangeContext();

  const isDisabledStartTime = useMemo(() => !Boolean(startDateTimestamp), [
    startDateTimestamp,
  ]);

  const isDisabledEndTime = useMemo(() => !Boolean(endDateTimestamp), [
    endDateTimestamp,
  ]);

  return (
    <div className={styles.time_picker} data-test-id="time-picker">
      <input
        data-test-id="time-picker-start"
        type="time"
        step="1"
        disabled={isDisabledStartTime}
        onChange={({ target }) => setStartTimeStringHandler(target.value)}
        value={startTimeString}
      />

      <input
        data-test-id="time-picker-end"
        type="time"
        step="1"
        disabled={isDisabledEndTime}
        onChange={({ target }) => setEndTimeStringHandler(target.value)}
        value={endTimeString}
      />
    </div>
  );
};

export default TimePicker;
