import React, { useMemo } from "react";
import { getNextMonthFromDate } from "../../utils/dateHalper";
import Calendar from "./Calendar";
import styles from "./CalendarContainer.module.scss";

const CalendarContainer = ({
  calendarVisibleCount,
  startDate,
  endDate,
  locales,
  showMonth,
} = {}) => {
  const calendars = useMemo(
    () =>
      new Array(calendarVisibleCount).fill(null).map((_, index) => ({
        key: index,
        date: getNextMonthFromDate(showMonth, index),
      })),
    [calendarVisibleCount, showMonth]
  );

  return (
    <div
      className={styles.calendar_container}
      style={{
        gridTemplateColumns: `repeat(${calendarVisibleCount}, 1fr)`,
      }}
    >
      {calendars.map((calendar) => (
        <Calendar
          key={calendar.key}
          date={calendar.date}
          from={startDate}
          to={endDate}
          locales={locales}
        />
      ))}
    </div>
  );
};

export default CalendarContainer;
