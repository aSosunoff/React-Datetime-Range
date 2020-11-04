import React from "react";
import PropTypes from "prop-types";
import Day from "./Day";
import WeekLine from "./WeekLine";
import styles from "./CalendarDefault.module.scss";

const CalendarDefault = ({ days, locales, children: Title }) => (
  <div className={styles.calendar}>
    <Title titleClass={styles.title} />

    <WeekLine locales={locales} />

    <div className={styles.grid} data-test-id="calendar-container-day">
      {days.map((day) => (
        <Day key={day.index} {...day} />
      ))}
    </div>
  </div>
);

CalendarDefault.defaultProps = {
  locales: "ru",
};

CalendarDefault.propTypes = {
  locales: PropTypes.string,
  days: PropTypes.array.isRequired,
};

export default CalendarDefault;
