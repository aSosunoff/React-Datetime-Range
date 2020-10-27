import React from "react";
import styles from "./Control.module.scss";
import { useShowDateContext } from "../../contexts/showDateContext";

const Control = () => {
  const { nextMonthHandler, prevMonthHandler } = useShowDateContext();

  return (
    <>
      <div
        className={styles.control_left}
        onClick={prevMonthHandler}
        data-test-id="control-left"
      />
      <div
        className={styles.control_right}
        onClick={nextMonthHandler}
        data-test-id="control-right"
      />
    </>
  );
};

export default Control;
