import { useCallback, useMemo } from "react";
import {
	getDateWithoutTime,
	getMonthDayCount,
	getNumberFirsDayOfWeekByMonth,
} from "../utils/dateHalper";

export default function useDays(date, from, to) {
	const monthDayCount = useMemo(() => getMonthDayCount(date), [date]);

	const firsDayOfWeekByMonth = useMemo(
		() => getNumberFirsDayOfWeekByMonth(date),
		[date]
	);

	const fromLocal = useMemo(() => from && getDateWithoutTime(from), [from]);

	const toLocal = useMemo(() => to && getDateWithoutTime(to), [to]);

	const isFrom = useCallback(
		(date) => Boolean(fromLocal) && fromLocal.getTime() === date.getTime(),
		[fromLocal]
	);

	const isTo = useCallback(
		(date) => Boolean(toLocal) && toLocal.getTime() === date.getTime(),
		[toLocal]
	);

	const isBetween = useCallback(
		(date) =>
			Boolean(fromLocal) &&
			Boolean(toLocal) &&
			fromLocal.getTime() < date.getTime() &&
			date.getTime() < toLocal.getTime(),
		[fromLocal, toLocal]
	);

	return {
		monthDayCount,
		firsDayOfWeekByMonth,
		isFrom,
		isTo,
		isBetween,
	};
}
