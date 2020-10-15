import React, { useMemo } from "react";
import cn from "classnames";
import styles from "./Days.module.css";
import useDays from "../../hooks/useDays";

const Days = ({ date = new Date(), from, to, onSetDay = () => {} } = {}) => {
	const {
		monthDayCount,
		firsDayOfWeekByMonth,
		isFrom,
		isTo,
		isBetween,
	} = useDays(date, from, to);

	const dayList = useMemo(() => {
		return new Array(monthDayCount).fill(null).map((_, index) => {
			const dayNumber = index + 1;
			
			const dateWithoutTime = new Date(
				date.getFullYear(),
				date.getMonth(),
				dayNumber
			);

			return {
				dayNumber,
				style: {
					gridColumnStart: dayNumber === 1 ? firsDayOfWeekByMonth : null,
				},
				classStyle: isFrom(dateWithoutTime)
					? styles["rangepicker__selected-from"]
					: isBetween(dateWithoutTime)
					? styles["rangepicker__selected-between"]
					: isTo(dateWithoutTime)
					? styles["rangepicker__selected-to"]
					: "",
				handler: () => onSetDay(dateWithoutTime),
			};
		});
	}, [
		date,
		firsDayOfWeekByMonth,
		isBetween,
		isFrom,
		isTo,
		monthDayCount,
		onSetDay,
	]);

	return (
		<div className={styles["rangepicker__date-grid"]}>
			{dayList.map(({ dayNumber, style, classStyle, handler }) => (
				<button
					key={dayNumber}
					type="button"
					style={style}
					className={cn(styles.rangepicker__cell, classStyle)}
					onClick={handler}
				>
					{dayNumber}
				</button>
			))}
		</div>
	);
};

export default Days;
