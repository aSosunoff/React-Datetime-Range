import React, { useEffect, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import styles from "./TimePicker.module.scss";

const TimePicker = ({
  startDate,
  endDate,
  onSetTimeStart,
  onSetTimeEnd,
  onSetBlur,
  onSetFocus,
}) => {
  const inputStartRef = useRef();
  const inputEndRef = useRef();

  const timeFrom = useMemo(
    () => (startDate ? startDate.toLocaleTimeString() : ""),
    [startDate]
  );

  const timeTo = useMemo(() => (endDate ? endDate.toLocaleTimeString() : ""), [
    endDate,
  ]);

  useEffect(() => {
    if (startDate && !endDate) {
      inputStartRef.current.focus();
    } else if (startDate && endDate) {
      inputEndRef.current.focus();
    }
  }, [startDate, endDate]);

  const getFormatTime = (value) => {
    const [hour = 0, minute = 0, second = 0] = value.split(":").map(Number);

    return [hour, minute, second];
  };

  return (
    <div className={styles.time_picker} data-test-id="time-picker">
      <input
        data-test-id="time-picker-start"
        ref={inputStartRef}
        type="time"
        step="1"
        disabled={!Boolean(timeFrom)}
        onChange={({ target }) =>
          onSetTimeStart(...getFormatTime(target.value))
        }
        value={timeFrom}
        onBlur={onSetBlur}
        onFocus={onSetFocus}
      />

      <input
        data-test-id="time-picker-end"
        ref={inputEndRef}
        type="time"
        step="1"
        disabled={!Boolean(timeTo)}
        onChange={({ target }) => onSetTimeEnd(...getFormatTime(target.value))}
        value={timeTo}
        onBlur={onSetBlur}
        onFocus={onSetFocus}
      />
    </div>
  );
};

TimePicker.defaultProps = {
  startDate: null,
  endDate: null,
  onSetTimeStart: () => {},
  onSetTimeEnd: () => {},
  onSetBlur: () => {},
  onSetFocus: () => {},
};

TimePicker.propTypes = {
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  onSetTimeStart: PropTypes.func,
  onSetTimeEnd: PropTypes.func,
  onSetBlur: PropTypes.func,
  onSetFocus: PropTypes.func,
};

export default TimePicker;
