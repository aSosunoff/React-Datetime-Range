import React from "react";
import PropTypes from "prop-types";
import styles from "./TimePicker.module.scss";

const TimePicker = ({
  startTime,
  endTime,
  isDisabledStartTime,
  isDisabledEndTime,
  onSetTimeStart,
  onSetTimeEnd,
}) => {
  return (
    <div className={styles.time_picker} data-test-id="time-picker">
      <input
        data-test-id="time-picker-start"
        type="time"
        step="1"
        disabled={isDisabledStartTime}
        onChange={({ target }) => onSetTimeStart(target.value)}
        value={startTime}
      />

      <input
        data-test-id="time-picker-end"
        type="time"
        step="1"
        disabled={isDisabledEndTime}
        onChange={({ target }) => onSetTimeEnd(target.value)}
        value={endTime}
      />
    </div>
  );
};

TimePicker.defaultProps = {
  onSetTimeStart: () => {},
  onSetTimeEnd: () => {},
};

TimePicker.propTypes = {
  startTime: PropTypes.string, // TODO: ВОТКНУТЬ ПРОВЕРКУ
  endTime: PropTypes.string, // TODO: ВОТКНУТЬ ПРОВЕРКУ
  onSetTimeStart: PropTypes.func,
  onSetTimeEnd: PropTypes.func,
};

export default TimePicker;
