import React from "react";
import styles from "./Control.module.scss";

const Control = ({ prevHandler, nextHandler }) => (
  <>
    <div
      className={styles.control_left}
      onClick={prevHandler}
      data-id="control-left"
    />
    <div
      className={styles.control_right}
      onClick={nextHandler}
      data-id="control-right"
    />
  </>
);

export default Control;
