import React, { useState, useEffect } from "react";
import classes from "./Calendar.module.css";

export const Calendar = ({ date = new Date(), from, to } = {}) => {
	const [localeString, setLocaleString] = useState(
		date.toLocaleString("ru", { month: "long" })
	);

	useEffect(() => {
		setLocaleString(date.toLocaleString("ru", { month: "long" }));
	}, [date]);

	return (
		<div className={classes["rangepicker__calendar"]}>
			<div className={classes["rangepicker__month-indicator"]}>
				<time dateTime={localeString}>{localeString}</time>
			</div>

			<div className={classes["rangepicker__day-of-week"]}>
				<div>Пн</div>
				<div>Вт</div>
				<div>Ср</div>
				<div>Чт</div>
				<div>Пт</div>
				<div>Сб</div>
				<div>Вс</div>
			</div>

			{/* <Days :date="date" :from="from" :to="to" @onSetDay="date => $emit('onSetDay', date)" /> */}
		</div>
	);
};
