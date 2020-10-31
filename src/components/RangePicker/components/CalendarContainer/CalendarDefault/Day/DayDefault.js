import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import styles from "./DayDefault.module.scss";
import { useHoverDayContext } from "../../../../contexts/hoverDayContext";
import { debounceDecorator } from "../../../../utils/debounceDecorator";
import { useRangeContext } from "../../../../contexts/rangeContext";

const DayDefault = ({
  number,
  gridColumnStart,
  dateTimestamp,
  isStart,
  isBetween,
  isEnd,
  isThisDay,
  isHoverStart,
  isHoverBetween,
  isCurrentMonth,
}) => {
  const { setHoverDayTimestamp } = useHoverDayContext();

  const { setRangeHandler } = useRangeContext();

  const debounceSetHoverDay = useMemo(
    () => debounceDecorator(setHoverDayTimestamp, 80),
    [setHoverDayTimestamp]
  );

  const clickHandler = useCallback(
    () => isCurrentMonth && setRangeHandler(dateTimestamp),
    [dateTimestamp, isCurrentMonth, setRangeHandler]
  );

  const mouseEnterHandler = useCallback(
    () => isCurrentMonth && debounceSetHoverDay(dateTimestamp),
    [dateTimestamp, isCurrentMonth, debounceSetHoverDay]
  );

  let isSaturday = false;
  let isSunday = false;

  if (isCurrentMonth) {
    isSaturday = new Date(dateTimestamp).getDay() === 6;
    isSunday = new Date(dateTimestamp).getDay() === 0;
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
      onClick={clickHandler}
      onMouseEnter={mouseEnterHandler}
    >
      {number}
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
  dateTimestamp: PropTypes.number.isRequired,
  isThisDay: PropTypes.bool,
  isCurrentMonth: PropTypes.bool,
  isStart: PropTypes.bool,
  isBetween: PropTypes.bool,
  isEnd: PropTypes.bool,
};

export default DayDefault;
