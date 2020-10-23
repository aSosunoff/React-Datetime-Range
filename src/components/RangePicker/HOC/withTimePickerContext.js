import React from "react";
import { TimePickerProvider } from "../contexts/timePicker";

const withTimePickerContext = (WrapperComponent) => (props) => (
  <TimePickerProvider>
    <WrapperComponent {...props} />
  </TimePickerProvider>
);

export default withTimePickerContext;
