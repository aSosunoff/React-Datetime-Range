import React, { createContext, useContext } from "react";
import useRange from "../hooks/range/useRange";

const RangeContext = createContext();
RangeContext.displayName = "RangeContext";

export const useRangeContext = () => useContext(RangeContext);

export const RangeProvider = ({ startDate, endDate, children }) => {
  const {
    /* Range */
    startDate: _startDate,
    endDate: _endDate,
    resetHandler,
    setRangeHandler,
    /* Date */
    startDateTimestamp,
    endDateTimestamp,
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
        setRangeHandler,
        /* Date */
        startDateTimestamp,
        endDateTimestamp,
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
