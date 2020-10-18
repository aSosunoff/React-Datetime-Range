import React, { useMemo } from "react";
import useDays from "../../../hooks/useDays";
import DayNumber from "../../DayNumber";
import WeekLine from "../../WeekLine";
import styles from "./Calendar.module.scss";

const Calendar = ({ date, from, to, locales } = {}) => {
  const localeString = useMemo(
    () => date.toLocaleString(locales, { month: "long", year: "numeric" }),
    [date, locales]
  );

  const { days } = useDays(date, from, to);

  return (
    <div className={styles.calendar}>
      <div className={styles.title}>
        <time dateTime={localeString}>{localeString}</time>
      </div>

      <WeekLine locales={locales} />

      <div className={styles.grid}>
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
