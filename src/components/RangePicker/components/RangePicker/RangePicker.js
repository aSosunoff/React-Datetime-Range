import React, { useCallback, useMemo, useState } from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import styles from "./RangePicker.module.scss";
import variable from "./variable.module.scss";
import { DayProvider } from "../../contexts/day";
import useMonth from "../../hooks/useMonth";
import useRange from "../../hooks/useRange";
import useAddListener from "../../hooks/useAddListener";
import BottomBar from "./../BottomBar/BottomBar";
import TimePicker from "./../TimePicker/TimePicker";
import Control from "./../Control";
import CalendarContainer from "./../CalendarContainer";

const format = (locales, date) =>
  date.toLocaleString(locales, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

const RangePicker = React.forwardRef(
  (
    {
      isOpen,
      startDate,
      endDate,
      onClose,
      onRangeSelected,
      calendarVisibleCount,
      locales,
      style,
    },
    ref
  ) => {
    const {
      startDate: _startDate,
      endDate: _endDate,
      setRangeHandler,
      resetHandler,
      setTimeFromHandler,
      setTimeToHandler,
    } = useRange(startDate, endDate);

    const applyHandler = useCallback(() => {
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

    const {
      month,
      nextHandler: nextMonthHandler,
      prevHandler: prevMonthHandler,
    } = useMonth(startDate);

    const [isFocus, setFocusHandler] = useState(false);

    const _handleDocumentLeftRightClick = useCallback(
      (event) => {
        if (isFocus) {
          return;
        }

        if (event.key === "ArrowLeft") {
          prevMonthHandler();
        } else if (event.key === "ArrowRight") {
          nextMonthHandler();
        }
      },
      [isFocus, nextMonthHandler, prevMonthHandler]
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

    return (
      <DayProvider setDayHandler={setDayHandler}>
        <div
          ref={ref}
          className={cn(styles.rangepicker, variable["range-picker-variable"])}
          style={style}
        >
          <Control
            prevHandler={prevMonthHandler}
            nextHandler={nextMonthHandler}
          />

          <CalendarContainer
            calendarVisibleCount={calendarVisibleCount}
            startDate={_startDate}
            endDate={_endDate}
            locales={locales}
            showMonth={month}
          />

          <TimePicker
            startDate={_startDate}
            endDate={_endDate}
            onSetTimeStart={setTimeFromHandler}
            onSetTimeEnd={setTimeToHandler}
            onSetFocus={setFocusHandler}
          />

          <BottomBar title={rangeString}>
            <div onClick={applyHandler} data-id="apply-button">
              применить
            </div>
            <div onClick={resetHandler} data-id="clear-button">
              очистить
            </div>
          </BottomBar>
        </div>
      </DayProvider>
    );
  }
);

RangePicker.defaultProps = {
  isOpen: false,
  onClose: () => {},
  onRangeSelected: () => {},
  calendarVisibleCount: 2,
  locales: "ru",
};

RangePicker.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  onClose: PropTypes.func,
  onRangeSelected: PropTypes.func,
  calendarVisibleCount: PropTypes.number.isRequired,
  locales: PropTypes.string,
  style: PropTypes.object,
};

export default RangePicker;
