import React, { useMemo } from "react";
import PropTypes from "prop-types";
import styles from "./BottomBar.module.scss";
import { useRangeContext } from "../../contexts/rangeContext";

const format = (locales, date) =>
  date.toLocaleString(locales, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

const BottomBar = ({ locales, applyHandler }) => {
  const { startDate, endDate, resetHandler } = useRangeContext();

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
    <div className={styles.bottom_bar} data-test-id="bottom-bar">
      {title ? (
        <div className={styles.title} data-test-id="bottom-bar-title">
          {title}
        </div>
      ) : null}

      <div
        className={styles.button}
        onClick={applyHandler}
        data-test-id="bottom-bar-apply-button"
      >
        применить
      </div>

      <div
        className={styles.button}
        onClick={resetHandler}
        data-test-id="bottom-bar-clear-button"
      >
        очистить
      </div>
    </div>
  );
};

BottomBar.defaultProps = {
  locales: "ru",
  applyHandler: () => {},
};

BottomBar.propTypes = {
  locales: PropTypes.string,
  applyHandler: PropTypes.func,
};

export default BottomBar;
