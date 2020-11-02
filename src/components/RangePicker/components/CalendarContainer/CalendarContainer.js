import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { getNextMonth } from "../../utils/dateHalper";
import CalendarDefault from "./CalendarDefault";
import styles from "./CalendarContainer.module.scss";
import {
  HoverDayProvider,
  useHoverDayContext,
} from "../../contexts/hoverDayContext";
import CalendarSelector from "./CalendarSelector/CalendarSelector";
import { useShowDateContext } from "../../contexts/showDateContext";
import useCalendar from "../../hooks/useCalendar";
import { useCalendarVisible } from "../../hooks/useCalendarVisible";
import { useRangeContext } from "../../contexts/rangeContext";
import { withContext } from "../../HOC/withContext";
import useHoverCurrentMonth from "../../hooks/useHoverCurrentMonth";

const CalendarContainer = ({ locales }) => {
  const { showDate, setMonthHandler, setYearHandler } = useShowDateContext();

  const { setHoverDayTimestamp } = useHoverDayContext();

  const nextMonth = useMemo(() => getNextMonth(showDate), [showDate]);

  const changeMonthHandler = useCallback(setMonthHandler, [setMonthHandler]);

  const changeYearHandler = useCallback(setYearHandler, [setYearHandler]);

  const { startDateTimestamp, endDateTimestamp } = useRangeContext();

  const calendarLeft = useCalendar(
    showDate,
    startDateTimestamp,
    endDateTimestamp
  );

  const calendarLeftHoverDays = useHoverCurrentMonth(
    calendarLeft.currentMonth.days,
    startDateTimestamp,
    endDateTimestamp
  );

  const calendarRight = useCalendar(
    nextMonth,
    startDateTimestamp,
    endDateTimestamp
  );

  const calendarRightHoverDays = useHoverCurrentMonth(
    calendarRight.currentMonth.days,
    startDateTimestamp,
    endDateTimestamp
  );

  const [calendarLeftDays, calendarRightDays] = useCalendarVisible(
    {
      ...calendarLeft,
      currentMonth: {
        ...calendarLeft.currentMonth,
        days: calendarLeftHoverDays,
      },
    },
    {
      ...calendarRight,
      currentMonth: {
        ...calendarRight.currentMonth,
        days: calendarRightHoverDays,
      },
    }
  );

  return (
    <div
      className={styles.calendar_container}
      onMouseLeave={setHoverDayTimestamp.bind(this, null)}
    >
      <CalendarSelector
        date={showDate}
        days={calendarLeftDays}
        locales={locales}
        changeMonthHandler={changeMonthHandler}
        changeYearHandler={changeYearHandler}
      />
      <CalendarDefault
        date={nextMonth}
        days={calendarRightDays}
        locales={locales}
      />
    </div>
  );
};

CalendarContainer.defaultProps = {
  locales: "ru",
};

CalendarContainer.propTypes = {
  locales: PropTypes.string,
};

export default withContext(HoverDayProvider)(CalendarContainer);
