import React, { createContext, useCallback, useState } from "react";

export const TimePickerContext = createContext();
TimePickerContext.displayName = "TimePickerContext";

export const TimePickerProvider = ({ children }) => {
  const [isFocus, setFocusHandler] = useState(false);

  const setFocus = useCallback(() => setFocusHandler(true), []);
  const setBlur = useCallback(() => setFocusHandler(false), []);

  return (
    <TimePickerContext.Provider value={{ setFocus, setBlur, isFocus }}>
      {children}
    </TimePickerContext.Provider>
  );
};
