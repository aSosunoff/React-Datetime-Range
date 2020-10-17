import React, { useContext } from "react";
import cn from "classnames";
import styles from "./DayNumber.module.scss";
import { DayContext } from "../../contexts/day";

const DayNumber = ({
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
    from: styles["rangepicker__selected-from"],
    between: styles["rangepicker__selected-between"],
    to: styles["rangepicker__selected-to"],
  };

  const className = typeButton[type] || null;

  return (
    <button
      type="button"
      style={{ gridColumnStart }}
      className={cn(styles.rangepicker__cell, className, {
        [styles.rangepicker__current]: isCurrent,
        [styles.rangepicker__free]: isSaturday || isSunday,
      })}
      onClick={setDay.bind(this, date)}
    >
      {number}
    </button>
  );
};

export default DayNumber;
