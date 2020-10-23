import React, { useContext, useEffect, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import styles from "./TimePicker.module.scss";
import { TimePickerContext } from "../../contexts/timePicker";

const TimePicker = ({ startDate, endDate, onSetTimeStart, onSetTimeEnd }) => {
  const inputStartRef = useRef();
  const inputEndRef = useRef();

  const { setFocus, setBlur } = useContext(TimePickerContext);

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
    <div className={styles.time_picker} data-id="time-picker">
      <input
        data-id="time-picker-start"
        ref={inputStartRef}
        type="time"
        step="1"
        disabled={!Boolean(timeFrom)}
        onChange={({ target }) =>
          onSetTimeStart(...getFormatTime(target.value))
        }
        value={timeFrom}
        onBlur={setBlur}
        onFocus={setFocus}
      />

      <input
        data-id="time-picker-end"
        ref={inputEndRef}
        type="time"
        step="1"
        disabled={!Boolean(timeTo)}
        onChange={({ target }) => onSetTimeEnd(...getFormatTime(target.value))}
        value={timeTo}
        onBlur={setBlur}
        onFocus={setFocus}
      />
    </div>
  );
};

TimePicker.defaultProps = {
  startDate: null,
  endDate: null,
  onSetTimeStart: () => {},
  onSetTimeEnd: () => {},
  onSetFocus: () => {},
};

TimePicker.propTypes = {
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  onSetTimeStart: PropTypes.func,
  onSetTimeEnd: PropTypes.func,
  onSetFocus: PropTypes.func,
};

export default TimePicker;
