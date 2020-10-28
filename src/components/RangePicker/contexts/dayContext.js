import React, { createContext, useContext, useMemo, useState } from "react";
import { debounceDecorator } from "../utils/debounceDecorator";

const DayContext = createContext();
DayContext.displayName = "DayContext";

export const useDayContext = () => {
  return useContext(DayContext);
};

export const DayProvider = ({ children }) => {
  const [day, setDay] = useState(null);

  const [hoverDay, setHoverDay] = useState(null);

  const debounceSetHoverDay = useMemo(
    () => debounceDecorator(setHoverDay, 80),
    [setHoverDay]
  );

  return (
    <DayContext.Provider
      value={{ setDay, day, setHoverDay: debounceSetHoverDay, hoverDay }}
    >
      {children}
    </DayContext.Provider>
  );
};
