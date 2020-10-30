import React from "react";
import { RangeProvider } from "../contexts/rangeContext";

export const withRangeContext = (WrapperComponent) => {
  const WithRangeContext = ({ startDate, endDate, ...props }) => {
    return (
      <RangeProvider startDate={startDate} endDate={endDate}>
        <WrapperComponent {...props} />
      </RangeProvider>
    );
  };

  return WithRangeContext;
};
