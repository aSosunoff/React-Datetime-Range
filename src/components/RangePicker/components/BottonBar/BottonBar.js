import React, { useCallback } from "react";
import cn from "classnames";
import styles from "./BottonBar.module.scss";

const BottonBar = ({ children }) => {
  const modifyChildren = useCallback(
    (child) =>
      React.cloneElement(child, {
        className: cn(child.props.className, styles.button),
      }),
    []
  );

  return (
    <div className={styles.container_button}>
      {React.Children.map(children, (child) => modifyChildren(child))}
    </div>
  );
};

export default BottonBar;
