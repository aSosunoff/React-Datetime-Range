import React, { createContext, useContext } from "react";
import useRange from "../hooks/useRange";

const RangeContext = createContext();
RangeContext.displayName = "RangeContext";

export const useRangeContext = () => {
  return useContext(RangeContext);
};

export const RangeProvider = ({ startDate, endDate, children }) => {
  const {
    /* Range */
    startDate: _startDate,
    endDate: _endDate,
    resetHandler,
    /* Date */
    startDateTimestamp,
    endDateTimestamp,
    setDateTimestampRangeHandler,
    /* Time */
    startTimeString,
    endTimeString,
    setStartTimeStringHandler,
    setEndTimeStringHandler,
  } = useRange(startDate, endDate);

  return (
    <RangeContext.Provider
      value={{
        /* Range */
        startDate: _startDate,
        endDate: _endDate,
        resetHandler,
        /* Date */
        startDateTimestamp,
        endDateTimestamp,
        setDateTimestampRangeHandler,
        /* Time */
        startTimeString,
        endTimeString,
        setStartTimeStringHandler,
        setEndTimeStringHandler,
      }}
    >
      {children}
    </RangeContext.Provider>
  );
};
