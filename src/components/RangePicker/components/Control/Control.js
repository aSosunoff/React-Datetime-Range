import React, { useCallback } from "react";
import styles from "./Control.module.scss";
import { useShowDateContext } from "../../contexts/showDateContext";
import { useEventListener } from "../../hooks/useEventListener";

const Control = ({ isOpen }) => {
  const { nextMonthHandler, prevMonthHandler } = useShowDateContext();

  const _handleDocumentLeftRightClick = useCallback(
    (event) => {
      if (!isOpen) {
        return;
      }

      if (event.key === "ArrowLeft") {
        prevMonthHandler();
      } else if (event.key === "ArrowRight") {
        nextMonthHandler();
      }
    },
    [isOpen, nextMonthHandler, prevMonthHandler]
  );

  useEventListener("keydown", _handleDocumentLeftRightClick);

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
