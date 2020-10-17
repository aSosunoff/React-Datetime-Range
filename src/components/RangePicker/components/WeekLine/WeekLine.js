import React from "react";
import styles from "./WeekLine.module.scss";

const WeekLine = () => {
  const dayOfWeekName = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

  return (
    <div className={styles["rangepicker__day-of-week"]}>
      {dayOfWeekName.map((name) => (
        <div key={name}>{name}</div>
      ))}
    </div>
  );
};

export default WeekLine;
