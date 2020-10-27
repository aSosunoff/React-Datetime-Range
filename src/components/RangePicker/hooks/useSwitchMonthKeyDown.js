import { useCallback } from "react";
import useAddListener from "./useAddListener";
import useSwitchMonth from "./useSwitchMonth";

export default function useSwitchMonthKeyDown(date, isOpen, isFocus) {
  const switchMonth = useSwitchMonth(date);

  const _handleDocumentLeftRightClick = useCallback(
    (event) => {
      if (isFocus) {
        return;
      }

      if (!isOpen) {
        return;
      }

      if (event.key === "ArrowLeft") {
        switchMonth.prevHandler();
      } else if (event.key === "ArrowRight") {
        switchMonth.nextHandler();
      }
    },
    [isFocus, isOpen, switchMonth]
  );

  useAddListener(document, "keydown", _handleDocumentLeftRightClick);

  return {
    ...switchMonth,
  };
}
