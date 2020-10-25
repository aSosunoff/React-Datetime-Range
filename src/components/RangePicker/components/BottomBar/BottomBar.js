import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import cn from "classnames";
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

const BottomBar = ({ startDate, endDate, locales, children }) => {
  const modifyChildren = useCallback(
    (child) =>
      React.cloneElement(child, {
        className: cn(child.props.className, styles.button),
      }),
    []
  );

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
      {React.Children.map(children, modifyChildren)}
    </div>
  );
};

BottomBar.defaultProps = {
  locales: "ru",
  children: [],
};

BottomBar.propTypes = {
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  locales: PropTypes.string,
  children: PropTypes.array,
};

export default BottomBar;
