import React, { useCallback, useContext } from "react";
import { TimePickerContext } from "../contexts/timePicker";
import useAddListener from "../hooks/useAddListener";
import useMonth from "../hooks/useSwitchMonth";

export const withControl = (WrapperComponent) =>
  React.forwardRef(({ isOpen, ...props }, ref) => {
    const { isFocus } = useContext(TimePickerContext);

    const {
      month,
      nextHandler: nextMonthHandler,
      prevHandler: prevMonthHandler,
    } = useMonth(props.startDate);

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
      [isFocus, nextMonthHandler, prevMonthHandler, isOpen]
    );

    useAddListener(document, "keydown", _handleDocumentLeftRightClick);

    return (
      <WrapperComponent
        {...props}
        ref={ref}
        month={month}
        prevMonthHandler={prevMonthHandler}
        nextMonthHandler={nextMonthHandler}
      />
    );
  });
