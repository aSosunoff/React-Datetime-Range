import React, { useMemo } from "react";
import PropTypes from "prop-types";
import CalendarDefault from "../CalendarDefault";
import styles from "./CalendarSimple.module.scss";

const CalendarSimple = ({ date, ...props }) => {
  const localeString = useMemo(
    () =>
      date.toLocaleString(props.locales, { month: "long", year: "numeric" }),
    [date, props.locales]
  );

  return (
    <CalendarDefault {...props}>
      <div className={styles.title} data-test-id="calendar-title">
        <time dateTime={localeString}>{localeString}</time>
      </div>
    </CalendarDefault>
  );
};

CalendarSimple.defaultProps = {};

CalendarSimple.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
};

export default CalendarSimple;
