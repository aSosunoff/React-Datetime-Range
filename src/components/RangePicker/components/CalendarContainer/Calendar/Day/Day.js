import React, { useCallback } from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import styles from "./Day.module.scss";
import { useDayContext } from "../../../../contexts/day";

const Day = ({
  dayNumber,
  gridColumnStart,
  date,
  isStart,
  isBetween,
  isEnd,
  isCurrent,
  isHoverStart,
  isHoverBetween,
}) => {
  const { setDay, setHoverDay } = useDayContext();

  const isSaturday = date.getDay() === 6;

  const isSunday = date.getDay() === 0;

  return (
    <button
      type="button"
      style={{ gridColumnStart }}
      className={cn(styles.cell, {
        [styles.start]: isStart,
        [styles.between]: isBetween,
        [styles.end]: isEnd,
        [styles.current]: isCurrent,
        [styles.saturday]: isSaturday,
        [styles.sunday]: isSunday,
        [styles.hover_start]: isHoverStart,
        [styles.hover_between]: isHoverBetween,
      })}
      onClick={setDay.bind(this, date)}
      onMouseEnter={setHoverDay.bind(this, date)}
    >
      {dayNumber}
    </button>
  );
};

Day.defaultProps = {
  isStart: false,
  isBetween: false,
  isEnd: false,
  isCurrent: false,
};

Day.propTypes = {
  dayNumber: (props, propName, componentName) => {
    if (!props[propName]) {
      return new Error(
        `Prop ${propName} of ${componentName} should be required`
      );
    }

    if (props[propName] <= 0) {
      return new Error(
        `Prop ${propName} of ${componentName} should be above zero`
      );
    }
  },
  gridColumnStart: PropTypes.number,
  type: PropTypes.string,
  date: PropTypes.instanceOf(Date).isRequired,
  isCurrent: PropTypes.bool,
  isStart: PropTypes.bool,
  isBetween: PropTypes.bool,
  isEnd: PropTypes.bool,
};

export default Day;
