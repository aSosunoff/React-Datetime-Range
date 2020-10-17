import { useCallback, useState } from "react";
import { getNextMonth, getPrevMonth } from "../utils/dateHalper";

export default function useShowMonth(date) {
	const [showMonth, setShowMonth] = useState(date ?? new Date());

	const nextMonthHandler = useCallback(
		() => setShowMonth(getNextMonth(showMonth)),
		[showMonth]
	);

	const prevMonthHandler = useCallback(
		() => setShowMonth(getPrevMonth(showMonth)),
		[showMonth]
	);

	return {
		showMonth,
		nextMonthHandler,
		prevMonthHandler,
	};
}
