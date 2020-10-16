import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import cn from "classnames";

import styles from "./RangePicker.module.css";
import variable from "./variable.module.css";
import { getNextMonthFromDate } from "../../utils/dateHalper";
import { getBounding } from "../../utils/getBounding";
import Calendar from "../Calendar";
import Animation from "../Animation";
import { DayProvider } from "../../contexts/day";
import useShowMonth from "../../hooks/useShowMonth";

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

  const {
    showMonth,
    yearName,
    nextMonthHandler,
    prevMonthHandler,
  } = useShowMonth(from);

  const calendars = useMemo(
    () =>
      new Array(calendarVisibleCount).fill(null).map((_, index) => ({
        key: index,
        date: getNextMonthFromDate(showMonth, index),
      })),
    [calendarVisibleCount, showMonth]
  );

  const [bounding, setBounding] = useState({
    top: 0,
    left: 0,
  });

  const _handleDocumentClick = useCallback(
    (event) =>
      rangepicker.current &&
      !rangepicker.current.contains(event.target) &&
      isOpen &&
      !target.contains(event.target) &&
      onClose(),
    [isOpen, target, onClose]
  );

  useEffect(() => {
    document.addEventListener("click", _handleDocumentClick, true);
    setBounding(getBounding(target, rangepicker.current));
    return () => {
      document.removeEventListener("click", _handleDocumentClick, true);
    };
  }, [target, _handleDocumentClick]);

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
      }
      setRange({ from, to });
    },
    [onClose, onRangeSelected, range.from, range.to]
  );

  const RangePicker = useCallback(
    (style) => (
      <DayProvider setDayHandler={setDayHandler}>
        <div
          ref={rangepicker}
          className={cn(styles.rangepicker, variable["range-picker-variable"])}
          style={style}
        >
          <div className={styles.rangepicker__selector}>
            <div
              className={styles["rangepicker__selector-control-left"]}
              onClick={prevMonthHandler}
            />

            <div
              className={styles["rangepicker__selector-control-right"]}
              onClick={nextMonthHandler}
            />

            <div className={styles.rangepicker_year}>{yearName} год</div>

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
      nextMonthHandler,
      prevMonthHandler,
      range.from,
      range.to,
      setDayHandler,
      yearName,
    ]
  );

  return (
    <Animation inProp={isOpen} top={bounding.top} left={bounding.left}>
      {RangePicker}
    </Animation>
  );
};

export default RangePicker;
