import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import cn from "classnames";

import styles from "./RangePicker.module.css";
import {
	getNextMonthFromDate,
	getNextMonth,
	getPrevMonth,
} from "../utils/dateHalper";
import { getBounding } from "../utils/getBounding";
import Calendar from "./Calendar";
import Animation from "./Animation";
import { DayProvider } from "../contexts/day";

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
				date: getNextMonthFromDate(showDateFrom, index),
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

	const nextHandler = useCallback(
		() => setShowDateFrom(getNextMonth(showDateFrom)),
		[showDateFrom]
	);

	const prevHandler = useCallback(
		() => setShowDateFrom(getPrevMonth(showDateFrom)),
		[showDateFrom]
	);

	const setDayHandler = useCallback(
		(date) => {
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
		},
		[onClose, onRangeSelected, range.from, range.to]
	);

	const RangePicker = useCallback(
		(style) => (
			<DayProvider setDayHandler={setDayHandler}>
				<div ref={rangepicker} className={cn(styles.rangepicker)} style={style}>
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
								/>
							))}
						</div>
					</div>
				</div>
			</DayProvider>
		),
		[
			calendars,
			nextHandler,
			prevHandler,
			range.from,
			range.to,
			setDayHandler,
			year,
		]
	);

	return (
		<Animation inProp={isOpen} top={bounding.top} left={bounding.left}>
			{RangePicker}
		</Animation>
	);
};

export default RangePicker;
