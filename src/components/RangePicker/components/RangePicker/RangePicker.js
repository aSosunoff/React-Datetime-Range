import React, { useCallback, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import styles from "./RangePicker.module.scss";
import variable from "./variable.module.scss";
import useRange from "../../hooks/useRange";
import BottomBar from "./../BottomBar/BottomBar";
import TimePicker from "./../TimePicker/TimePicker";
import CalendarContainer from "./../CalendarContainer";
import { withAnimation } from "../../HOC/withAnimation";
import { withTimePickerContext } from "../../HOC/withTimePickerContext";
import { withDayContext } from "../../HOC/withDayContext";
import { DayContext } from "../../contexts/day";
import { compose } from "../../utils/compose";
import Control from "../Control";
import useSwitchMonthKeyDown from "../../hooks/useSwitchMonthKeyDown";
import { TimePickerContext } from "../../contexts/timePicker";

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

    const { isFocus } = useContext(TimePickerContext);

    const {
      month,
      nextHandler: nextMonthHandler,
      prevHandler: prevMonthHandler,
    } = useSwitchMonthKeyDown(startDate, isOpen, isFocus);

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

        <BottomBar
          startDate={_startDate}
          endDate={_endDate}
          locales={locales}
          applyHandler={applyHandler}
          resetHandler={resetHandler}
        />
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
  isOpen: PropTypes.bool,
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

RangePicker.propTypes = {
  ...defaultProps,
  ...animationProps,
};

export default compose(
  withDayContext,
  withTimePickerContext,
  withAnimation
)(RangePicker);
