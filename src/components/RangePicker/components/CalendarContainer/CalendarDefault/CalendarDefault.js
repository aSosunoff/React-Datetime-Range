import React, { useCallback, useMemo } from "react";
/* import useCalendar from "../../../hooks/useCalendar"; */
import PropTypes from "prop-types";
import Day from "./Day";
import WeekLine from "./WeekLine";
import styles from "./CalendarDefault.module.scss";

const CalendarDefault = ({ date, days, locales, TitleComponentRender }) => {
  /* const { days } = useCalendar(date, from, to); */

  const localeString = useMemo(
    () => date.toLocaleString(locales, { month: "long", year: "numeric" }),
    [date, locales]
  );

  const TitleComponent = useCallback(
    ({ titleClass }) => (
      <div className={titleClass} data-test-id="calendar-title">
        <time dateTime={localeString}>{localeString}</time>
      </div>
    ),
    [localeString]
  );

  let Title = TitleComponentRender || TitleComponent;

  return (
    <div className={styles.calendar}>
      <Title titleClass={styles.title} />

      <WeekLine locales={locales} />

      <div className={styles.grid} data-test-id="calendar-container">
        {days.map((day) => (
          <Day key={day.index} {...day} />
        ))}
      </div>
    </div>
  );
};

CalendarDefault.defaultProps = {
  locales: "ru",
};

CalendarDefault.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  locales: PropTypes.string,
  days: PropTypes.array.isRequired,
};

export default CalendarDefault;
