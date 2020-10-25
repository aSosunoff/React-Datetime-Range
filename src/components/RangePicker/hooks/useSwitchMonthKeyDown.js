import { useCallback } from "react";
import useAddListener from "./useAddListener";
import useSwitchMonth from "./useSwitchMonth";

export default function useSwitchMonthKeyDown(date, isOpen, isFocus) {
  const { month, nextHandler, prevHandler } = useSwitchMonth(date);

  const _handleDocumentLeftRightClick = useCallback(
    (event) => {
      if (isFocus) {
        return;
      }

      if (!isOpen) {
        return;
      }

      if (event.key === "ArrowLeft") {
        prevHandler();
      } else if (event.key === "ArrowRight") {
        nextHandler();
      }
    },
    [isFocus, nextHandler, prevHandler, isOpen]
  );

  useAddListener("keydown", _handleDocumentLeftRightClick);

  return {
    month,
    nextHandler,
    prevHandler,
  };
}
