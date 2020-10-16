import { useCallback, useMemo, useState } from "react";
import { getNextMonth, getPrevMonth } from "../utils/dateHalper";

export default function useShowDate(date) {
	const [showDate, setShowDate] = useState(date ?? new Date());

	const yearName = useMemo(() => {
		const date = showDate ?? new Date();
		return date.toLocaleString("ru", { year: "numeric" });
	}, [showDate]);

	const nextMonthHandler = useCallback(
		() => setShowDate(getNextMonth(showDate)),
		[showDate]
	);

	const prevMonthHandler = useCallback(
		() => setShowDate(getPrevMonth(showDate)),
		[showDate]
	);

	return {
		showDate,
		yearName,
		nextMonthHandler,
		prevMonthHandler,
	};
}
