import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { getNextMonth } from "../../utils/dateHalper";
import CalendarDefault from "./CalendarDefault";
import styles from "./CalendarContainer.module.scss";
import { DayProvider, useDayContext } from "../../contexts/dayContext";
import CalendarSelector from "./CalendarSelector/CalendarSelector";
import { useShowDateContext } from "../../contexts/showDateContext";
import useCalendar from "../../hooks/useCalendar";
import { useCalendarVisible } from "../../hooks/useCalendarVisible";
import { useRangeContext } from "../../contexts/rangeContext";
import { withContext } from "../../HOC/withContext";

const CalendarContainer = ({ locales }) => {
  const { showDate, setMonthHandler, setYearHandler } = useShowDateContext();

  const { setHoverDayTimestamp } = useDayContext();

  const nextMonth = useMemo(() => getNextMonth(showDate), [showDate]);

  const changeMonthHandler = useCallback((month) => setMonthHandler(month), [
    setMonthHandler,
  ]);
  const changeYearHandler = useCallback((year) => setYearHandler(year), [
    setYearHandler,
  ]);

  const { startDateTimestamp, endDateTimestamp } = useRangeContext();

  const calendarLeft = useCalendar(
    showDate,
    startDateTimestamp,
    endDateTimestamp
  );

  const calendarRight = useCalendar(
    nextMonth,
    startDateTimestamp,
    endDateTimestamp
  );

  const { calendarLeftDays, calendarRightDays } = useCalendarVisible(
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

export default withContext(DayProvider)(CalendarContainer);
