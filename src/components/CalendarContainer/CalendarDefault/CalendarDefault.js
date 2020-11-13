import React from "react";
import PropTypes from "prop-types";
import DayDefault from "./DayDefault";
import WeekLine from "./WeekLine";
import styles from "./CalendarDefault.module.scss";

const CalendarDefault = ({ days, locales, children: Title }) => (
  <div className={styles.calendar}>
    {Title}

    <WeekLine locales={locales} />

    <div className={styles.grid} data-test-id="calendar-default-day-container">
      {days.map((day) => (
        <DayDefault key={day.index} {...day} />
      ))}
    </div>
  </div>
);

CalendarDefault.defaultProps = {
  locales: "ru",
};

CalendarDefault.propTypes = {
  locales: PropTypes.string,
  days: PropTypes.instanceOf(Array).isRequired,
  children: PropTypes.element.isRequired,
};

export default CalendarDefault;
