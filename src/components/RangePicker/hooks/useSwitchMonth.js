import { useCallback, useState } from "react";
import { getNextMonth, getPrevMonth } from "../utils/dateHalper";

export default function useSwitchMonth(date) {
	const [month, setMonth] = useState(date ?? new Date());

	const nextHandler = useCallback(
		() => setMonth(getNextMonth(month)),
		[month]
	);

	const prevHandler = useCallback(
		() => setMonth(getPrevMonth(month)),
		[month]
	);

	return {
		month,
		nextHandler,
		prevHandler,
	};
}
