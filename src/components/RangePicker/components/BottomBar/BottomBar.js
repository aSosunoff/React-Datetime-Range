import React, { useCallback } from "react";
import cn from "classnames";
import styles from "./BottomBar.module.scss";

const BottomBar = ({ title, children }) => {
  const modifyChildren = useCallback(
    (child) =>
      React.cloneElement(child, {
        className: cn(child.props.className, styles.button),
      }),
    []
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

export default BottomBar;
