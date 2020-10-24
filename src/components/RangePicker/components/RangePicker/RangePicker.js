import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import styles from "./RangePicker.module.scss";
import variable from "./variable.module.scss";
import { DayProvider } from "../../contexts/day";
import useRange from "../../hooks/useRange";
import BottomBar from "./../BottomBar/BottomBar";
import TimePicker from "./../TimePicker/TimePicker";
import CalendarContainer from "./../CalendarContainer";
import withControl from "../../HOC/withControl";
import withAnimation from "../../HOC/withAnimation";
import withTimePickerContext from "../../HOC/withTimePickerContext";

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
      month,
      startDate,
      endDate,
      onClose,
      onRangeSelected,
      calendarVisibleCount,
      locales,
      style,
      Control,
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
          <Control />

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
  onClose: () => {},
  onRangeSelected: () => {},
  calendarVisibleCount: 2,
  locales: "ru",
};

RangePicker.propTypes = {
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  onClose: PropTypes.func,
  onRangeSelected: PropTypes.func,
  calendarVisibleCount: PropTypes.number.isRequired,
  locales: PropTypes.string,
  style: PropTypes.object,
};

export default withTimePickerContext(withAnimation(withControl(RangePicker)));
