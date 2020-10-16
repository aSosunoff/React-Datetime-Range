import React, { useMemo } from "react";
import useDays from "../../hooks/useDays";
import Day from "../Day";
import styles from "./Calendar.module.scss";

const Calendar = ({ date, from, to } = {}) => {
	const localeString = useMemo(
		() => date.toLocaleString("ru", { month: "long" }),
		[date]
	);

	const { days } = useDays(date, from, to);

	return (
		<div className={styles.rangepicker__calendar}>
			<div className={styles["rangepicker__month-indicator"]}>
				<time dateTime={localeString}>{localeString}</time>
			</div>

			<div className={styles["rangepicker__day-of-week"]}>
				<div>Пн</div>
				<div>Вт</div>
				<div>Ср</div>
				<div>Чт</div>
				<div>Пт</div>
				<div>Сб</div>
				<div>Вс</div>
			</div>

			<div className={styles["rangepicker__date-grid"]}>
				{days.map(({ dayNumber, gridColumnStart, type, date }) => (
					<Day
						key={dayNumber}
						number={dayNumber}
						gridColumnStart={gridColumnStart}
						type={type}
						date={date}
					/>
				))}
			</div>
		</div>
	);
};

export default Calendar;
