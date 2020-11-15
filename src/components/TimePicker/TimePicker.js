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

  const isDisabledStartTime = useMemo(() => !startDateTimestamp, [
    startDateTimestamp,
  ]);

  const isDisabledEndTime = useMemo(() => !endDateTimestamp, [
    endDateTimestamp,
  ]);

  return (
    <div className={styles.time_picker}>
      <input
        type="time"
        step="1"
        data-test-id="time-picker-start"
        disabled={isDisabledStartTime}
        onChange={({ target }) => setStartTimeStringHandler(target.value)}
        value={startTimeString}
      />

      <input
        type="time"
        step="1"
        data-test-id="time-picker-end"
        disabled={isDisabledEndTime}
        onChange={({ target }) => setEndTimeStringHandler(target.value)}
        value={endTimeString}
      />
    </div>
  );
};

export default TimePicker;
