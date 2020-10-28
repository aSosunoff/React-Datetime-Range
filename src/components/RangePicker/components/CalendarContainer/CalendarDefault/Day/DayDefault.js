import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import styles from "./DayDefault.module.scss";
import { useDayContext } from "../../../../contexts/dayContext";

const DayDefault = ({
  dayNumber,
  gridColumnStart,
  date,
  isStart,
  isBetween,
  isEnd,
  isThisDay,
  isHoverStart,
  isHoverBetween,
  isCurrentMonth,
}) => {
  const { setDay, setHoverDay } = useDayContext();
  let isSaturday = false;
  let isSunday = false;

  if (isCurrentMonth) {
    isSaturday = date.getDay() === 6;
    isSunday = date.getDay() === 0;
  }

  return (
    <button
      type="button"
      style={{ gridColumnStart }}
      className={cn(styles.cell, {
        [styles.start]: isStart,
        [styles.between]: isBetween,
        [styles.end]: isEnd,
        [styles.current]: isThisDay,
        [styles.saturday]: isSaturday,
        [styles.sunday]: isSunday,
        [styles.hover_start]: isHoverStart,
        [styles.hover_between]: isHoverBetween,
        [styles.not_current_month]: !isCurrentMonth,
      })}
      onClick={setDay.bind(this, date)}
      onMouseEnter={setHoverDay.bind(this, date)}
    >
      {dayNumber}
    </button>
  );
};

DayDefault.defaultProps = {
  isStart: false,
  isBetween: false,
  isEnd: false,
  isThisDay: false,
  isCurrentMonth: false,
};

DayDefault.propTypes = {
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
  isThisDay: PropTypes.bool,
  isCurrentMonth: PropTypes.bool,
  isStart: PropTypes.bool,
  isBetween: PropTypes.bool,
  isEnd: PropTypes.bool,
};

export default DayDefault;
