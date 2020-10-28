import React, { useCallback } from "react";
import styles from "./Control.module.scss";
import { useShowDateContext } from "../../contexts/showDateContext";
import useAddListener from "../../hooks/useAddListener";

const Control = ({ isFocus, isOpen }) => {
  const { nextMonthHandler, prevMonthHandler } = useShowDateContext();

  const _handleDocumentLeftRightClick = useCallback(
    (event) => {
      if (isFocus) {
        return;
      }

      if (!isOpen) {
        return;
      }

      if (event.key === "ArrowLeft") {
        prevMonthHandler();
      } else if (event.key === "ArrowRight") {
        nextMonthHandler();
      }
    },
    [isFocus, isOpen, nextMonthHandler, prevMonthHandler]
  );

  useAddListener(document, "keydown", _handleDocumentLeftRightClick);

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
