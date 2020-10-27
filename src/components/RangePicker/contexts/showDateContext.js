import React, { createContext, useContext } from "react";
import useShowDate from "../hooks/useShowDate";

const ShowDateContext = createContext();
ShowDateContext.displayName = "ShowDateContext";

export const useShowDateContext = () => {
  return useContext(ShowDateContext);
};

export const ShowDateProvider = ({ startDate, children }) => {
  const showDate = useShowDate(startDate);

  return (
    <ShowDateContext.Provider value={showDate}>
      {children}
    </ShowDateContext.Provider>
  );
};
