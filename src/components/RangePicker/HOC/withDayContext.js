import React from "react";
import { DayProvider } from "../contexts/day";

export const withDayContext = (WrapperComponent) => {
  const WithDayContext = (props) => {
    return (
      <DayProvider>
        <WrapperComponent {...props} />
      </DayProvider>
    );
  };

  return WithDayContext;
};
