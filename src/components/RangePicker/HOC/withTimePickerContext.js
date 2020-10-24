import React from "react";
import { TimePickerProvider } from "../contexts/timePicker";

export const withTimePickerContext = (WrapperComponent) => (props) => {
  return (
    <TimePickerProvider>
      <WrapperComponent {...props} />
    </TimePickerProvider>
  );
};
