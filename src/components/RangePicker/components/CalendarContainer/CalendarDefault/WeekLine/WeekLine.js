import React, { useMemo } from "react";
import PropTypes from "prop-types";
import styles from "./WeekLine.module.scss";
import { getWeeksNameLocales } from "../../../../utils/dateHalper";

const WeekLine = ({ locales }) => {
  const dayOfWeekName = useMemo(() => getWeeksNameLocales(locales), [locales]);

  return (
    <div className={styles.day_of_week}>
      {dayOfWeekName.map((name) => (
        <div key={name}>{name}</div>
      ))}
    </div>
  );
};

WeekLine.defaultProps = {
  locales: 'ru',
};

WeekLine.propTypes = {
  locales: PropTypes.string,
};

export default WeekLine;
