import React, { useCallback } from "react";
import { useShowDateContext } from "../../contexts/showDateContext";
import { useEventListener } from "../../hooks/useEventListener";
import { ArrowLeft, ArrowRight } from "../Arrow";

const Control = ({ isOpen }) => {
  const { nextMonthHandler, prevMonthHandler } = useShowDateContext();

  const handleDocumentLeftRightClick = useCallback(
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

  useEventListener("keydown", handleDocumentLeftRightClick);

  return (
    <>
      <ArrowLeft
        onClick={prevMonthHandler}
        style={{
          top: "17px",
          left: "5px",
        }}
      />
      <ArrowRight
        onClick={nextMonthHandler}
        style={{
          top: "17px",
          right: "5px",
        }}
      />
    </>
  );
};

export default Control;
