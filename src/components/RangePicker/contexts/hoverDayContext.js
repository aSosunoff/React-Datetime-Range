import React, { createContext, useContext, useState } from "react";

const HoverDayContext = createContext();
HoverDayContext.displayName = "HoverDayContext";

export const useHoverDayContext = () => {
  return useContext(HoverDayContext);
};

export const HoverDayProvider = ({ children }) => {
  const [hoverDayTimestamp, setHoverDayTimestamp] = useState(null);

  return (
    <HoverDayContext.Provider
      value={{
        setHoverDayTimestamp,
        hoverDayTimestamp,
      }}
    >
      {children}
    </HoverDayContext.Provider>
  );
};
