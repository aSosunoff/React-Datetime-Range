import React, { useCallback } from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import styles from "./RangePicker.module.scss";
import variable from "./variable.module.scss";
import BottomBar from "../BottomBar/";
import TimePicker from "../TimePicker/";
import CalendarContainer from "../CalendarContainer";
import { withAnimation } from "../../HOC/withAnimation";
import { compose } from "../../utils/compose";
import Control from "../Control";
import { RangeProvider, useRangeContext } from "../../contexts/rangeContext";
import { withContext } from "../../HOC/withContext";
import { ShowDateProvider } from "../../contexts/showDateContext";

const RangePicker = React.forwardRef(
  ({ isOpen, onClose, onRangeSelected, locales, style }, ref) => {
    const { startDate, endDate } = useRangeContext();

    const applyHandler = useCallback(() => {
      onRangeSelected({
        startDate,
        endDate,
      });
      onClose();
    }, [onRangeSelected, startDate, endDate, onClose]);

    return (
      <div
        ref={ref}
        className={cn(styles.rangepicker, variable["range-picker-variable"])}
        style={style}
      >
        <Control isOpen={isOpen} />

        <CalendarContainer locales={locales} />

        <TimePicker />

        <BottomBar locales={locales} applyHandler={applyHandler} />
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
  withContext(ShowDateProvider, ({ startDate, isOpen }) => ({
    startDate,
    isOpen,
  })),
  withContext(RangeProvider, ({ startDate, endDate }) => ({
    startDate,
    endDate,
  })),
  withAnimation
)(RangePicker);
