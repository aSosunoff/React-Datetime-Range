import React, { useCallback, useContext, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import styles from "./RangePicker.module.scss";
import variable from "./variable.module.scss";
import useRange from "../../hooks/useRange";
import BottomBar from "./../BottomBar/BottomBar";
import TimePicker from "./../TimePicker/TimePicker";
import CalendarContainer from "./../CalendarContainer";
import { withControl } from "../../HOC/withControl";
import { withAnimation } from "../../HOC/withAnimation";
import { withTimePickerContext } from "../../HOC/withTimePickerContext";
import { withDayContext } from "../../HOC/withDayContext";
import { DayContext } from "../../contexts/day";
import { compose } from "../../utils/compose";
import Control from "../Control";

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
      startDate,
      endDate,
      onClose,
      onRangeSelected,
      calendarVisibleCount,
      locales,
      style,
      month,
      prevMonthHandler,
      nextMonthHandler,
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

    const { day } = useContext(DayContext);

    useEffect(() => {
      let from = null;
      let to = null;
      if (!_startDate || _endDate) {
        from = day;
      } else {
        const current = day.getTime();
        to = new Date(Math.max(current, _startDate.getTime()));
        from = new Date(Math.min(current, _startDate.getTime()));
      }
      setRangeHandler(from, to);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [day]);

    return (
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
    );
  }
);

RangePicker.defaultProps = {
  onClose: () => {},
  onRangeSelected: () => {},
  calendarVisibleCount: 2,
  locales: "ru",
};

const defaultProps = {
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  onClose: PropTypes.func,
  onRangeSelected: PropTypes.func,
  calendarVisibleCount: PropTypes.number.isRequired,
  locales: PropTypes.string,
};

const animationProps = {
  style: PropTypes.object,
};

const controlProps = {
  month: PropTypes.instanceOf(Date),
  prevMonthHandler: PropTypes.func,
  nextMonthHandler: PropTypes.func,
};

RangePicker.propTypes = {
  ...defaultProps,
  ...animationProps,
  ...controlProps,
};

export default compose(
  withDayContext,
  withTimePickerContext,
  withAnimation,
  withControl
)(RangePicker);
