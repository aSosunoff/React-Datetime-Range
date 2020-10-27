import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { getNextMonthFromDate } from "../../utils/dateHalper";
import CalendarDefault from "./CalendarDefault";
import styles from "./CalendarContainer.module.scss";
import { useDayContext } from "../../contexts/day";

const CalendarContainer = ({
  calendarVisibleCount,
  startDate,
  endDate,
  locales,
  showMonth,
}) => {
  const calendars = useMemo(
    () =>
      new Array(calendarVisibleCount).fill(null).map((_, index) => ({
        key: index,
        date: getNextMonthFromDate(showMonth, index),
      })),
    [calendarVisibleCount, showMonth]
  );

  const { setHoverDay } = useDayContext();

  return (
    <div
      className={styles.calendar_container}
      style={{
        gridTemplateColumns: `repeat(${calendarVisibleCount}, 1fr)`,
      }}
      onMouseLeave={setHoverDay.bind(this, null)}
    >
      {calendars.map((calendar) => (
        <CalendarDefault
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

CalendarContainer.defaultProps = {
  calendarVisibleCount: 1,
  locales: "ru",
};

CalendarContainer.propTypes = {
  calendarVisibleCount: PropTypes.number.isRequired,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  locales: PropTypes.string,
  showMonth: PropTypes.instanceOf(Date).isRequired,
};

export default CalendarContainer;
