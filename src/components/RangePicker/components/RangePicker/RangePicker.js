import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import styles from "./RangePicker.module.scss";
import variable from "./variable.module.scss";
import useRange from "../../hooks/useRange";
import BottomBar from "./../BottomBar/BottomBar";
import TimePicker from "./../TimePicker/TimePicker";
import CalendarContainer from "./../CalendarContainer";
import { withAnimation } from "../../HOC/withAnimation";
import { withDayContext } from "../../HOC/withDayContext";
import { withShowDateContext } from "../../HOC/withShowDateContext";
import { useDayContext } from "../../contexts/dayContext";
import { compose } from "../../utils/compose";
import Control from "../Control";

const RangePicker = React.forwardRef(
  (
    { isOpen, startDate, endDate, onClose, onRangeSelected, locales, style },
    ref
  ) => {
    const {
      /* Range */
      startDate: _startDate,
      endDate: _endDate,
      resetHandler,
      /* Date */
      startDateTimestamp,
      endDateTimestamp,
      setDateTimestampRangeHandler,
      /* Time */
      startTimeString,
      endTimeString,
      setStartTimeStringHandler,
      setEndTimeStringHandler,
    } = useRange(startDate, endDate);

    const applyHandler = useCallback(() => {
      onRangeSelected({
        startDate: _startDate,
        endDate: _endDate,
      });
      onClose();
    }, [onRangeSelected, _startDate, _endDate, onClose]);

    const { dayTimestamp } = useDayContext();

    useEffect(() => {
      let from = null;
      let to = null;
      if (!startDateTimestamp || endDateTimestamp) {
        from = dayTimestamp;
      } else {
        const current = dayTimestamp;
        to = Math.max(current, startDateTimestamp);
        from = Math.min(current, startDateTimestamp);
      }
      setDateTimestampRangeHandler(from, to);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dayTimestamp]);

    return (
      <div
        ref={ref}
        className={cn(styles.rangepicker, variable["range-picker-variable"])}
        style={style}
        data-test-id="range-picker"
      >
        <Control isOpen={isOpen} />

        <CalendarContainer
          startDateTimestamp={startDateTimestamp}
          endDateTimestamp={endDateTimestamp}
          locales={locales}
        />

        <TimePicker
          startTime={startTimeString}
          isDisabledStartTime={!Boolean(startDateTimestamp)}
          endTime={endTimeString}
          isDisabledEndTime={!Boolean(endDateTimestamp)}
          onSetTimeStart={setStartTimeStringHandler}
          onSetTimeEnd={setEndTimeStringHandler}
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

RangePicker.displayName = "RangePicker";

RangePicker.defaultProps = {
  onClose: () => {},
  onRangeSelected: () => {},
  locales: "ru",
};

const defaultProps = {
  isOpen: PropTypes.bool,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  onClose: PropTypes.func,
  onRangeSelected: PropTypes.func,
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
  withShowDateContext,
  withDayContext,
  withAnimation
)(RangePicker);
