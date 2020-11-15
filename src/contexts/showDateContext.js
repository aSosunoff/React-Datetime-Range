import React, { createContext, useContext, useEffect } from "react";
import useShowDate from "../hooks/useShowDate";

const ShowDateContext = createContext();
ShowDateContext.displayName = "ShowDateContext";

export const useShowDateContext = () => useContext(ShowDateContext);

export const ShowDateProvider = ({ startDate, isOpen, children }) => {
  const { setShowDate, ...showDate } = useShowDate(startDate);

  useEffect(() => {
    if (startDate && isOpen) {
      setShowDate(startDate);
    }
  }, [startDate, isOpen, setShowDate]);

  return (
    <ShowDateContext.Provider value={showDate}>
      {children}
    </ShowDateContext.Provider>
  );
};
