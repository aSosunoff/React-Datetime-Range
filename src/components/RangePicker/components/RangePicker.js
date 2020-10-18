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
import { getNextMonthFromDate } from "../utils/dateHalper";
import { getBounding } from "../utils/getBounding";
import Calendar from "./Calendar";
import Animation from "./Animation";
import { DayProvider } from "../contexts/day";
import useShowMonth from "../hooks/useShowMonth";
import useRange from "../hooks/useRange";
import useAddListener from "../hooks/useAddListener";
import BottonBar from "./BottomBar/BottomBar";
import TimePicker from "./TimePicker/TimePicker";

const format = (locales, date) =>
  date.toLocaleString(locales, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

const RangePicker = ({
  isOpen = false,
  target,
  startDate,
  endDate,
  onClose = () => {},
  onRangeSelected = () => {},
  calendarVisibleCount = 2,
  locales,
} = {}) => {
  const rangepicker = useRef();

  const {
    startDate: _startDate,
    endDate: _endDate,
    setRangeHandler,
    rangeResetHandler,
    setTimeFromHandler,
    setTimeToHandler,
  } = useRange(startDate, endDate);

  const rangeApplyHandler = useCallback(() => {
    onRangeSelected({
      startDate: _startDate,
      endDate: _endDate,
    });
    onClose();
  }, [_startDate, _endDate, onClose, onRangeSelected]);

  const rangeString = useMemo(
    () =>
      _startDate && _endDate
        ? `${format(locales, _startDate)} - ${format(locales, _endDate)}`
        : _startDate
        ? `${format(locales, _startDate)}`
        : "",
    [_endDate, _startDate, locales]
  );

  const { showMonth, nextMonthHandler, prevMonthHandler } = useShowMonth(
    startDate
  );

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
      if (!_startDate || _endDate) {
        from = date;
      } else {
        const current = date.getTime();
        to = new Date(Math.max(current, _startDate.getTime()));
        from = new Date(Math.min(current, _startDate.getTime()));
      }
      setRangeHandler(from, to);
    },
    [_startDate, _endDate, setRangeHandler]
  );

  const RangePicker = useCallback(
    (style) => (
      <DayProvider setDayHandler={setDayHandler}>
        <div
          ref={rangepicker}
          className={cn(styles.rangepicker, variable["range-picker-variable"])}
          style={style}
        >
          <div className={styles.selector}>
            <div className={styles.control_left} onClick={prevMonthHandler} />

            <div className={styles.control_right} onClick={nextMonthHandler} />

            <div
              className={styles.calendar_container}
              style={{
                gridTemplateColumns: `repeat(${calendarVisibleCount}, 1fr)`,
              }}
            >
              {calendars.map((calendar) => (
                <Calendar
                  key={calendar.key}
                  date={calendar.date}
                  from={_startDate}
                  to={_endDate}
                  locales={locales}
                />
              ))}
            </div>

            <TimePicker
              startDate={_startDate}
              endDate={_endDate}
              setTimeFromHandler={setTimeFromHandler}
              setTimeToHandler={setTimeToHandler}
            />

            <BottonBar title={rangeString}>
              <div onClick={rangeApplyHandler}>применить</div>
              <div onClick={rangeResetHandler}>очистить</div>
            </BottonBar>
          </div>
        </div>
      </DayProvider>
    ),
    [
      setDayHandler,
      prevMonthHandler,
      nextMonthHandler,
      calendarVisibleCount,
      calendars,
      _startDate,
      _endDate,
      setTimeFromHandler,
      setTimeToHandler,
      rangeString,
      rangeApplyHandler,
      rangeResetHandler,
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
