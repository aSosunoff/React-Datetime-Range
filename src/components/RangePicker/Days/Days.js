import React, { useCallback, useMemo } from "react";
import cn from "classnames";
import styles from "./Days.module.css";

export const Days = ({
	date = new Date(),
	from = new Date(2020, 9, 12),
	to = new Date(2020, 9, 13),
	onSetDay = () => {},
} = {}) => {
	const monthDayCount = useMemo(
		() => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(),
		[date]
	);

	const firsDayOfWeekByMonth = useMemo(() => {
		const day = new Date(date.getFullYear(), date.getMonth()).getDay();

		return day === 0 ? 7 : day;
	}, [date]);

	const fromLocaly = useMemo(
		() => from && new Date(from.getFullYear(), from.getMonth(), from.getDate()),
		[from]
	);

	const toLocaly = useMemo(
		() => to && new Date(to.getFullYear(), to.getMonth(), to.getDate()),
		[to]
	);

	const isFrom = useCallback(
		(date) => Boolean(fromLocaly) && fromLocaly.getTime() === date.getTime(),
		[fromLocaly]
	);

	const isTo = useCallback(
		(date) => Boolean(toLocaly) && toLocaly.getTime() === date.getTime(),
		[toLocaly]
	);

	const isBetween = useCallback(
		(date) =>
			Boolean(fromLocaly) &&
			Boolean(toLocaly) &&
			fromLocaly.getTime() < date.getTime() &&
			date.getTime() < toLocaly.getTime(),
		[fromLocaly, toLocaly]
	);

	const months = useMemo(
		() =>
			new Array(monthDayCount).fill(null).map((_, index) => {
				const number = index + 1;
				const year = date.getFullYear();
				const month = date.getMonth();
				const dateWuthoutTime = new Date(year, month, number);

				return {
					number,
					style: {
						gridColumnStart: number === 1 ? firsDayOfWeekByMonth : null,
					},
					isFrom: isFrom(dateWuthoutTime),
					isTo: isTo(dateWuthoutTime),
					isBetween: isBetween(dateWuthoutTime),
				};
			}),
		[date, firsDayOfWeekByMonth, isBetween, isFrom, isTo, monthDayCount]
	);

	const setDayHandler = (numberMonth) => {
		onSetDay(new Date(date.getFullYear(), date.getMonth(), numberMonth));
	};

	return (
		<div className={styles["rangepicker__date-grid"]}>
			{months.map((month) => (
				<button
					key={month.number}
					type="button"
					style={month.style}
					className={cn(styles.rangepicker__cell, {
						[styles["rangepicker__selected-from"]]: month.isFrom,
						[styles["rangepicker__selected-to"]]: month.isTo,
						[styles["rangepicker__selected-between"]]: month.isBetween,
					})}
					onClick={setDayHandler.bind(this, month.number)}
				>
					{month.number}
				</button>
			))}
		</div>
	);
};
