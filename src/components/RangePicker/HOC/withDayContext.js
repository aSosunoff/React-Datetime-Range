import React from "react";
import { DayProvider } from "../contexts/day";

export const withDayContext = (WrapperComponent) => (props) => {
  return (
    <DayProvider>
      <WrapperComponent {...props} />
    </DayProvider>
  );
};
