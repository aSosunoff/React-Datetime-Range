import React, { createContext } from "react";

export const DayContext = createContext();
DayContext.displayName = "DayContext";

export const DayConsumer = DayContext.Consumer;

export const DayProvider = ({ setDayHandler, children }) => {
	return (
		<DayContext.Provider value={{ setDay: (date) => setDayHandler(date) }}>
			{children}
		</DayContext.Provider>
	);
};
