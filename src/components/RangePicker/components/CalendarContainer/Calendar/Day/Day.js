import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import styles from "./Day.module.scss";
import { useDayContext } from "../../../../contexts/day";

const Day = ({
  number,
  gridColumnStart,
  type,
  date,
  isCurrent,
  isSaturday,
  isSunday,
}) => {
  const { setDay } = useDayContext();

  const className = styles[type] || null;

  return (
    <button
      type="button"
      style={{ gridColumnStart }}
      className={cn(styles.cell, className, {
        [styles.current]: isCurrent,
        [styles.free]: !isCurrent && !className && (isSaturday || isSunday),
      })}
      onClick={setDay.bind(this, date)}
    >
      {number}
    </button>
  );
};

Day.defaultProps = {
  isCurrent: false,
  isSaturday: false,
  isSunday: false,
};

Day.propTypes = {
  number: (props, propName, componentName) => {
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
  isSaturday: PropTypes.bool,
  isSunday: PropTypes.bool,
};

export default Day;
