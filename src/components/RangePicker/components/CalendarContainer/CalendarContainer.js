import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { getNextMonth } from "../../utils/dateHalper";
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
import CalendarSimple from "./CalendarSimple";

const CalendarContainer = ({ locales }) => {
  const { showDate, setMonthHandler, setYearHandler } = useShowDateContext();

  const { setHoverDayTimestamp } = useHoverDayContext();

  const nextMonth = useMemo(() => getNextMonth(showDate), [showDate]);

  const changeMonthHandler = useCallback(setMonthHandler, [setMonthHandler]);

  const changeYearHandler = useCallback(setYearHandler, [setYearHandler]);

  const { startDateTimestamp, endDateTimestamp } = useRangeContext();

  const calendarLeft = useCalendar(
    startDateTimestamp,
    endDateTimestamp,
    showDate
  );

  const calendarRight = useCalendar(
    startDateTimestamp,
    endDateTimestamp,
    nextMonth
  );

  const [calendarLeftDays, calendarRightDays] = useCalendarVisible(
    calendarLeft,
    calendarRight
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
      <CalendarSimple
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
