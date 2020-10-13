import React, { useMemo } from "react";
import Days from "../Days";
import styles from "./Calendar.module.css";

const Calendar = ({
	date,
	from,
	to,
	onSetDay = () => {},
} = {}) => {
	const localeString = useMemo(
		() => date.toLocaleString("ru", { month: "long" }),
		[date]
	);

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

			<Days date={date} from={from} to={to} onSetDay={onSetDay} />
		</div>
	);
};

export default Calendar;
