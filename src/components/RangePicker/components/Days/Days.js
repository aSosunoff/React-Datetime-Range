import React from "react";
import cn from "classnames";
import styles from "./Days.module.css";

const Days = ({ number, style, type, onClickHandler }) => {
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
		>
			{number}
		</button>
	);
};

export default Days;
