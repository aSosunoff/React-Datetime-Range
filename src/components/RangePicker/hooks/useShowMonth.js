import { useCallback, useMemo, useState } from "react";
import { getNextMonth, getPrevMonth } from "../utils/dateHalper";

export default function useShowMonth(date) {
	const [showMonth, setShowMonth] = useState(date ?? new Date());

	const yearName = useMemo(() => {
		const date = showMonth ?? new Date();
		return date.toLocaleString("ru", { year: "numeric" });
	}, [showMonth]);

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
		yearName,
		nextMonthHandler,
		prevMonthHandler,
	};
}
