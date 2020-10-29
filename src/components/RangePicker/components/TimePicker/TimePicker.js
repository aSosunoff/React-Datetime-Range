import React, { useMemo } from "react";
import PropTypes from "prop-types";
import styles from "./TimePicker.module.scss";

const TimePicker = ({ startDate, endDate, onSetTimeStart, onSetTimeEnd }) => {
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
    <div className={styles.time_picker} data-test-id="time-picker">
      <input
        data-test-id="time-picker-start"
        type="time"
        step="1"
        disabled={!Boolean(timeFrom)}
        onChange={({ target }) =>
          onSetTimeStart(...getFormatTime(target.value))
        }
        value={timeFrom}
      />

      <input
        data-test-id="time-picker-end"
        type="time"
        step="1"
        disabled={!Boolean(timeTo)}
        onChange={({ target }) => onSetTimeEnd(...getFormatTime(target.value))}
        value={timeTo}
      />
    </div>
  );
};

TimePicker.defaultProps = {
  startDate: null,
  endDate: null,
  onSetTimeStart: () => {},
  onSetTimeEnd: () => {},
};

TimePicker.propTypes = {
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  onSetTimeStart: PropTypes.func,
  onSetTimeEnd: PropTypes.func,
};

export default TimePicker;
