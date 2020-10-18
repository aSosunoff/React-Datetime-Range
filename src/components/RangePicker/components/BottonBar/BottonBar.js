import React, { useCallback } from "react";
import cn from "classnames";
import styles from "./BottonBar.module.scss";

const BottonBar = ({ title, children }) => {
  const modifyChildren = useCallback(
    (child) =>
      React.cloneElement(child, {
        className: cn(child.props.className, styles.button),
      }),
    []
  );

  return (
    <div className={styles.container_button}>
      <div className={styles.title}>{title}</div>
      {React.Children.map(children, modifyChildren)}
    </div>
  );
};

export default BottonBar;
