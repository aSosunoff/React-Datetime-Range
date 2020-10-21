import React, { useMemo } from "react";
import styles from "./TimePicker.module.scss";

const TimePicker = ({
  startDate,
  endDate,
  setTimeFromHandler,
  setTimeToHandler,
}) => {
  const timeFrom = useMemo(
    () => (startDate ? startDate.toLocaleTimeString() : ""),
    [startDate]
  );

  const timeTo = useMemo(() => (endDate ? endDate.toLocaleTimeString() : ""), [
    endDate,
  ]);

  const getFormatTime = (value) => {
    const [hour = 0, minute = 0, second = 0] = value.split(":").map(Number);

    return [hour, minute, second];
  };

  return (
    <div className={styles.time_picker} data-id="time-picker">
      <input
        data-id="time-picker-start"
        type="time"
        step="1"
        disabled={!Boolean(timeFrom)}
        onChange={({ target }) =>
          setTimeFromHandler(...getFormatTime(target.value))
        }
        value={timeFrom}
      />
      <input
        data-id="time-picker-end"
        type="time"
        step="1"
        disabled={!Boolean(timeTo)}
        onChange={({ target }) =>
          setTimeToHandler(...getFormatTime(target.value))
        }
        value={timeTo}
      />
    </div>
  );
};

export default TimePicker;
