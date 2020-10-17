import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import cn from "classnames";

import styles from "./RangePicker.module.scss";
import variable from "./variable.module.scss";
import { getNextMonthFromDate } from "../../utils/dateHalper";
import { getBounding } from "../../utils/getBounding";
import Calendar from "../Calendar";
import Animation from "../Animation";
import { DayProvider } from "../../contexts/day";
import useShowMonth from "../../hooks/useShowMonth";
import useRange from "../../hooks/useRange";
import useAddListener from "../../hooks/useAddListener";

const RangePicker = ({
  isOpen = false,
  target,
  from,
  to,
  onClose = () => {},
  onRangeSelected = () => {},
  calendarVisibleCount = 2,
  locales,
} = {}) => {
  const rangepicker = useRef();

  const { range, setRange } = useRange(from, to);

  const { showMonth, nextMonthHandler, prevMonthHandler } = useShowMonth(from);

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

  useEffect(() => {
    setBounding(getBounding(target, rangepicker.current));
  }, [target]);

  const _handleDocumentClick = useCallback(
    (event) =>
      rangepicker.current &&
      !rangepicker.current.contains(event.target) &&
      isOpen &&
      !target.contains(event.target) &&
      onClose(),
    [isOpen, target, onClose]
  );

  useAddListener("pointerdown", _handleDocumentClick, isOpen);

  const _handleDocumentLeftRightClick = useCallback(
    (event) => {
      if (event.key === "ArrowLeft") {
        prevMonthHandler();
      } else if (event.key === "ArrowRight") {
        nextMonthHandler();
      }
    },
    [nextMonthHandler, prevMonthHandler]
  );

  useAddListener("keydown", _handleDocumentLeftRightClick, isOpen);

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
    [onClose, onRangeSelected, range.from, range.to, setRange]
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

            <div className={styles.rangepicker_calendar}>
              {calendars.map((calendar) => (
                <Calendar
                  key={calendar.key}
                  date={calendar.date}
                  from={range.from}
                  to={range.to}
                  locales={locales}
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
      locales,
    ]
  );

  return (
    <Animation inProp={isOpen} top={bounding.top} left={bounding.left}>
      {RangePicker}
    </Animation>
  );
};

export default RangePicker;
