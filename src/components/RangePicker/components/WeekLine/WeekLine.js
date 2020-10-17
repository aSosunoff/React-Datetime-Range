import React, { useMemo } from "react";
import styles from "./WeekLine.module.scss";
import { getWeeksNameLocales } from "../../utils/dateHalper";

const WeekLine = ({ locales }) => {
  const dayOfWeekName = useMemo(() => getWeeksNameLocales(locales), [locales]);

  return (
    <div className={styles["rangepicker__day-of-week"]}>
      {dayOfWeekName.map((name) => (
        <div key={name}>{name}</div>
      ))}
    </div>
  );
};

export default WeekLine;
