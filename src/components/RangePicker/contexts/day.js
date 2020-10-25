import React, { createContext, useState } from "react";

export const DayContext = createContext();
DayContext.displayName = "DayContext";

export const DayProvider = ({ children }) => {
  const [day, setDay] = useState(null);

  return (
    <DayContext.Provider value={{ setDay, day }}>
      {children}
    </DayContext.Provider>
  );
};
