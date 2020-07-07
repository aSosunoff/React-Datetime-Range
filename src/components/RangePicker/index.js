import React, { useState, useEffect } from "react";
import classes from "./index.module.css";
import { getBounding } from "../utils/getBounding";
import { Calendar } from "./Calendar";

export const RangePicker = ({
	isOpen = false,
	from = new Date(),
	to = new Date(),
	target = null,
	onClose = () => {},
} = {}) => {
	const [bounding, setBounding] = useState({
		top: 0,
		left: 0,
	});

	const [showDateFrom, setShowDateFrom] = useState(from);

	const [year, setYear] = useState(
		showDateFrom.toLocaleString("ru", { year: "numeric" })
	);

	useEffect(() => {
		setYear(showDateFrom.toLocaleString("ru", { year: "numeric" }));
	}, [showDateFrom]);

	const closeHandler = ({ target }) => {
		if (!target.closest(`.${classes.rangepicker}`)) {
			/* if (!this.to) {
				this.$emit('update:to', this.from);
				this.$emit('onRangeSelected', { from: this.from, to: this.to });
			} */
			onClose();
		}
	};

	useEffect(() => {
		if (target) {
			const { top, left } = getBounding(
				target,
				document.querySelector(`.${classes.rangepicker}`)
			);

			setBounding({
				top,
				left,
			});
		}
	}, [target]);

	useEffect(() => {
		document.addEventListener("click", closeHandler, true);

		return () => {
			document.removeEventListener("click", closeHandler, true);
		};
	});

	let cls = [classes.rangepicker];
	!isOpen || cls.push(classes.rangepicker__open);

	const setDayHandler = (date) => {
		/* let _from = null;
		let _to = null;
		if (this.to) {
			_from = date;
		} else {
			const current = date.getTime();
			to = new Date(Math.max(current, this.from.getTime()));
			from = new Date(Math.min(current, this.from.getTime()));
			this.$emit('onRangeSelected', { from, to });
			this.close();
		}
		this.$emit('update:from', from);
		this.$emit('update:to', to); */
	};

	const nextMonth = (date) => {
		return new Date(date.getFullYear(), date.getMonth() + 1, 1);
	};

	const prevMonth = (date) => {
		return new Date(date.getFullYear(), date.getMonth() - 1, 1);
	};

	return (
		<div
			className={cls.join(" ")}
			style={{
				left: `${bounding.left}px`,
				top: `${bounding.top}px`,
			}}
		>
			<div className={classes["rangepicker__selector"]}>
				<div
					className={classes["rangepicker__selector-control-left"]}
					onClick={() => {
						setShowDateFrom(prevMonth(showDateFrom));
					}}
				></div>
				<div
					className={classes["rangepicker__selector-control-right"]}
					onClick={() => setShowDateFrom(nextMonth(showDateFrom))}
				></div>

				<div className={classes["rangepicker_year"]}>{year} год</div>

				<div className={classes["rangepicker_calendar"]}>
					<Calendar
						date={showDateFrom}
						from={from}
						to={to}
						onSetDay={setDayHandler}
					/>
					<Calendar
						date={nextMonth(showDateFrom)}
						from={from}
						to={to}
						onSetDay={setDayHandler}
					/>
				</div>
			</div>
		</div>
	);
};
