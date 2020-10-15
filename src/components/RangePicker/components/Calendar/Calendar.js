import React, { useMemo } from "react";
import useDays from "../../hooks/useDays";
import Days from "../Days";
import styles from "./Calendar.module.css";

const Calendar = ({ date, from, to } = {}) => {
	const localeString = useMemo(
		() => date.toLocaleString("ru", { month: "long" }),
		[date]
	);

	const { dayList } = useDays(date, from, to);

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
				{dayList.map(({ dayNumber, style, type, date }) => (
					<Days key={dayNumber} number={dayNumber} style={style} type={type} />
				))}
			</div>
		</div>
	);
};

export default Calendar;
