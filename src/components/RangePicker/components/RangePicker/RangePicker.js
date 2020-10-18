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
import BottonBar from "../BottonBar/BottonBar";

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

  const timeFrom = useMemo(
    () => (_startDate ? _startDate.toLocaleTimeString() : ""),
    [_startDate]
  );

  const timeTo = useMemo(
    () => (_endDate ? _endDate.toLocaleTimeString() : ""),
    [_endDate]
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
                  from={_startDate}
                  to={_endDate}
                  locales={locales}
                />
              ))}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gridGap: "5px",
                justifyItems: "center",
              }}
            >
              <input
                type="time"
                step="2"
                onChange={({ target }) =>
                  setTimeFromHandler(...target.value.split(":"))
                }
                value={timeFrom}
              />
              <input
                type="time"
                step="2"
                onChange={({ target }) =>
                  setTimeToHandler(...target.value.split(":"))
                }
                value={timeTo}
              />
            </div>

            <BottonBar>
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
      calendars,
      setTimeFromHandler,
      timeFrom,
      setTimeToHandler,
      timeTo,
      rangeApplyHandler,
      rangeResetHandler,
      _startDate,
      _endDate,
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
