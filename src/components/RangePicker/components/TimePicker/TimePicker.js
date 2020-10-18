import React, { useMemo } from "react";
/* import cn from "classnames"; */
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

  return (
    <div className={styles.time_picker}>
      <input
        type="time"
        step="2"
        onChange={({ target }) =>
          setTimeFromHandler(...target.value.split(":"))
        }
        value={timeFrom}
      />
      <input
        type="time"
        step="2"
        onChange={({ target }) => setTimeToHandler(...target.value.split(":"))}
        value={timeTo}
      />
    </div>
  );
};

export default TimePicker;
