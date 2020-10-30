import React, { createContext, useContext, useState } from "react";

const DayContext = createContext();
DayContext.displayName = "DayContext";

export const useDayContext = () => {
  return useContext(DayContext);
};

export const DayProvider = ({ children }) => {
  const [hoverDayTimestamp, setHoverDayTimestamp] = useState(null);

  return (
    <DayContext.Provider
      value={{
        setHoverDayTimestamp,
        hoverDayTimestamp,
      }}
    >
      {children}
    </DayContext.Provider>
  );
};
