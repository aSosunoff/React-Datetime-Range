import React, { useMemo } from "react";
import useDays from "../../hooks/useDays";
import DayNumber from "../DayNumber";
import WeekLine from "../WeekLine";
import styles from "./Calendar.module.scss";

const Calendar = ({ date, from, to } = {}) => {
  const localeString = useMemo(
    () => date.toLocaleString("ru", { month: "long" }),
    [date]
  );

  const { days } = useDays(date, from, to);

  return (
    <div className={styles.rangepicker__calendar}>
      <div className={styles["rangepicker__month-indicator"]}>
        <time dateTime={localeString}>{localeString}</time>
      </div>

      <WeekLine />

      <div className={styles["rangepicker__date-grid"]}>
        {days.map(
          ({
            dayNumber,
            gridColumnStart,
            type,
            date,
            isCurrent,
            isSaturday,
            isSunday,
          }) => (
            <DayNumber
              key={dayNumber}
              isCurrent={isCurrent}
              isSaturday={isSaturday}
              isSunday={isSunday}
              number={dayNumber}
              gridColumnStart={gridColumnStart}
              type={type}
              date={date}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Calendar;
