import React, { useContext } from "react";
import cn from "classnames";
import styles from "./Days.module.css";
import { DayContext } from "../../contexts/day";

const Days = ({ number, style, type, date }) => {
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
			style={style}
			className={cn(styles.rangepicker__cell, className)}
			onClick={setDay.bind(this, date)}
		>
			{number}
		</button>
	);
};

export default Days;
