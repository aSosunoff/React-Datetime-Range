import React, { useContext } from "react";
import cn from "classnames";
import styles from "./Day.module.scss";
import { DayContext } from "../../contexts/day";

const Day = ({ number, gridColumnStart, type, date }) => {
	const { setDay } = useContext(DayContext);

	const typeButton = {
		from: styles["rangepicker__selected-from"],
		between: styles["rangepicker__selected-between"],
		to: styles["rangepicker__selected-to"],
	};

	const className = typeButton[type] || null;

	return (
		<button
			type="button"
			style={{ gridColumnStart }}
			className={cn(styles.rangepicker__cell, className)}
			onClick={setDay.bind(this, date)}
		>
			{number}
		</button>
	);
};

export default Day;
