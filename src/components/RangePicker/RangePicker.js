import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import cn from "classnames";

import styles from "./RangePicker.module.css";
import { getBounding } from "../utils/getBounding";
import Calendar from "./Calendar";

const DateHalper = {
	getNextMonthFromDate: (startDate, index) =>
		new Date(startDate.getFullYear(), startDate.getMonth() + index, 1),
	nextMonth: (date) => new Date(date.getFullYear(), date.getMonth() + 1, 1),
	prevMonth: (date) => new Date(date.getFullYear(), date.getMonth() - 1, 1),
};

const RangePicker = ({
	isOpen = false,
	target,
	from,
	to,
	onClose = () => {},
	onRangeSelected = () => {},
	calendarVisibleCount = 2,
} = {}) => {
	const rangepicker = useRef();

	const [range, setRange] = useState({ from, to });

	const [showDateFrom, setShowDateFrom] = useState(from ?? new Date());

	const calendars = useMemo(
		() =>
			new Array(calendarVisibleCount).fill(null).map((_, index) => ({
				key: index,
				date: DateHalper.getNextMonthFromDate(showDateFrom, index),
			})),
		[calendarVisibleCount, showDateFrom]
	);

	const [bounding, setBounding] = useState({
		top: 0,
		left: 0,
	});

	const _handleDocumentClick = useCallback(
		(event) => {
			if (
				rangepicker.current &&
				!rangepicker.current.contains(event.target) &&
				isOpen &&
				!target.contains(event.target)
			) {
				/* if (!range.to) {
					onRangeSelected({ from: range.from, to: range.from });
				} */

				onClose();
			}
		},
		[isOpen, target, onClose]
	);

	useEffect(() => {
		document.addEventListener("click", _handleDocumentClick, true);
		setBounding(getBounding(target, rangepicker.current));
		return () => {
			document.removeEventListener("click", _handleDocumentClick, true);
		};
	}, [target, _handleDocumentClick]);

	const year = useMemo(() => {
		const date = showDateFrom ?? new Date();
		return date.toLocaleString("ru", { year: "numeric" });
	}, [showDateFrom]);

	const nextHandler = () => setShowDateFrom(DateHalper.nextMonth(showDateFrom));

	const prevHandler = () => setShowDateFrom(DateHalper.prevMonth(showDateFrom));

	const setDayHandler = (date) => {
		let from = null;
		let to = null;
		if (!range.from || range.to) {
			from = date;
		} else {
			const current = date.getTime();
			to = new Date(Math.max(current, range.from.getTime()));
			from = new Date(Math.min(current, range.from.getTime()));
			onRangeSelected({ from, to });
			onClose();
			/* document.removeEventListener("click", this.onClose, true); */
			/* this.$emit("onClose"); */
			/* this.isOpen = false; */
		}
		setRange({ from, to });
	};

	return isOpen ? (
		<div
			ref={rangepicker}
			className={cn(styles.rangepicker)}
			style={{
				left: `${bounding.left}px`,
				top: `${bounding.top}px`,
			}}
		>
			<div className={styles.rangepicker__selector}>
				<div
					className={styles["rangepicker__selector-control-left"]}
					onClick={prevHandler}
				></div>

				<div
					className={styles["rangepicker__selector-control-right"]}
					onClick={nextHandler}
				></div>

				<div className={styles["rangepicker_year"]}>{year} год</div>

				<div className={styles.rangepicker_calendar}>
					{calendars.map((calendar) => (
						<Calendar
							key={calendar.key}
							date={calendar.date}
							from={range.from}
							to={range.to}
							onSetDay={setDayHandler}
						/>
					))}
				</div>
			</div>
		</div>
	) : null;
};

export default RangePicker;
