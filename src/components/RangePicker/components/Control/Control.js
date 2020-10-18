import React from "react";
import styles from "./Control.module.scss";

const Control = ({ prevHandler, nextHandler }) => (
  <>
    <div className={styles.control_left} onClick={prevHandler} />
    <div className={styles.control_right} onClick={nextHandler} />
  </>
);

export default Control;
