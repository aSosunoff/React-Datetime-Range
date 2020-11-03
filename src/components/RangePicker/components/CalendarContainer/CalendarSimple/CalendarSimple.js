import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import CalendarDefault from "../CalendarDefault";

const CalendarSimple = ({ date, ...props }) => {
  const localeString = useMemo(
    () =>
      date.toLocaleString(props.locales, { month: "long", year: "numeric" }),
    [date, props.locales]
  );

  const Title = useCallback(
    ({ titleClass }) => (
      <div className={titleClass} data-test-id="calendar-title">
        <time dateTime={localeString}>{localeString}</time>
      </div>
    ),
    [localeString]
  );

  return <CalendarDefault {...props}>{Title}</CalendarDefault>;
};

CalendarSimple.defaultProps = {};

CalendarSimple.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
};

export default CalendarSimple;
