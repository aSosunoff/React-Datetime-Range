import React, { useContext } from "react";
import cn from "classnames";
import styles from "./Day.module.scss";
import { DayContext } from "../../../../contexts/day";

const Day = ({
  number,
  gridColumnStart,
  type,
  date,
  isCurrent = false,
  isSaturday = false,
  isSunday = false,
}) => {
  const { setDay } = useContext(DayContext);

  const typeButton = {
    from: styles.start,
    between: styles.between,
    to: styles.end,
  };

  const className = typeButton[type] || null;

  return (
    <button
      type="button"
      style={{ gridColumnStart }}
      className={cn(styles.cell, className, {
        [styles.current]: isCurrent,
        [styles.free]:
          !isCurrent && !className && (isSaturday || isSunday),
      })}
      onClick={setDay.bind(this, date)}
    >
      {number}
    </button>
  );
};

export default Day;
