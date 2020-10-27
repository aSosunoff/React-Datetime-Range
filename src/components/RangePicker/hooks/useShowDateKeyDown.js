import { useCallback } from "react";
import useAddListener from "./useAddListener";
import useShowDate from "./useShowDate";

export default function useShowDateKeyDown(date, isOpen, isFocus) {
  const switchMonth = useShowDate(date);

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
