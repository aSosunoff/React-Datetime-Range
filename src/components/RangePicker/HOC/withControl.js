import React, { useCallback, useContext } from "react";
import Control from "../components/Control";
import { TimePickerContext } from "../contexts/timePicker";
import useAddListener from "../hooks/useAddListener";
import useMonth from "../hooks/useMonth";

const withControl = (WrapperComponent) =>
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

    useAddListener("keydown", _handleDocumentLeftRightClick);

    const RenderControl = useCallback(
      () => (
        <Control
          prevHandler={nextMonthHandler}
          nextHandler={prevMonthHandler}
        />
      ),
      [nextMonthHandler, prevMonthHandler]
    );

    return (
      <WrapperComponent
        {...props}
        ref={ref}
        month={month}
        Control={RenderControl}
      />
    );
  });

export default withControl;
