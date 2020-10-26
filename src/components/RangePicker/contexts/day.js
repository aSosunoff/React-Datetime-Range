import React, { createContext, useContext, useState } from "react";

const DayContext = createContext();
DayContext.displayName = "DayContext";

export const useDayContext = () => {
  return useContext(DayContext);
};

export const DayProvider = ({ children }) => {
  const [day, setDay] = useState(null);

  return (
    <DayContext.Provider value={{ setDay, day }}>
      {children}
    </DayContext.Provider>
  );
};
