import React, { useMemo } from "react";
import PropTypes from "prop-types";
import styles from "./BottomBar.module.scss";

const format = (locales, date) =>
  date.toLocaleString(locales, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

const BottomBar = ({
  startDate,
  endDate,
  locales,
  applyHandler,
  resetHandler,
}) => {
  const title = useMemo(
    () =>
      startDate && endDate
        ? `${format(locales, startDate)} - ${format(locales, endDate)}`
        : startDate
        ? `${format(locales, startDate)}`
        : "",
    [startDate, endDate, locales]
  );

  return (
    <div className={styles.bottom_bar}>
      {title ? (
        <div className={styles.title} data-id="bottom-bar-title">
          {title}
        </div>
      ) : null}
      <div
        className={styles.button}
        onClick={applyHandler}
        data-id="apply-button"
      >
        применить
      </div>
      <div
        className={styles.button}
        onClick={resetHandler}
        data-id="clear-button"
      >
        очистить
      </div>
    </div>
  );
};

BottomBar.defaultProps = {
  locales: "ru",
  applyHandler: () => {},
  resetHandler: () => {},
};

BottomBar.propTypes = {
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  locales: PropTypes.string,
  children: PropTypes.array,
  applyHandler: PropTypes.func,
  resetHandler: PropTypes.func,
};

export default BottomBar;
