import React, { createContext, useContext, useState } from "react";

const DayContext = createContext();
DayContext.displayName = "DayContext";

export const useDayContext = () => {
  return useContext(DayContext);
};

export const DayProvider = ({ children }) => {
  const [day, setDay] = useState(null);

  const [hoverDay, setHoverDay] = useState(null);

  return (
    <DayContext.Provider value={{ setDay, day, setHoverDay, hoverDay }}>
      {children}
    </DayContext.Provider>
  );
};
