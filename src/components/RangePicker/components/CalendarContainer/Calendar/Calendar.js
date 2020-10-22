import React, { useMemo } from "react";
import useDays from "../../../hooks/useDays";
import PropTypes from "prop-types";
import Day from "./Day";
import WeekLine from "./WeekLine";
import styles from "./Calendar.module.scss";

const Calendar = ({ date, from, to, locales }) => {
  const localeString = useMemo(
    () => date.toLocaleString(locales, { month: "long", year: "numeric" }),
    [date, locales]
  );

  const { days } = useDays(date, from, to);

  return (
    <div className={styles.calendar}>
      <div className={styles.title} data-id="calendar-title">
        <time dateTime={localeString}>{localeString}</time>
      </div>

      <WeekLine locales={locales} />

      <div className={styles.grid} data-id="calendar-container">
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
            <Day
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

Calendar.defaultProps = {
  locales: "ru",
};

Calendar.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  from: PropTypes.instanceOf(Date),
  to: PropTypes.instanceOf(Date),
  locales: PropTypes.string,
};

export default Calendar;
