import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { getNextMonth } from "../../utils/dateHalper";
import CalendarDefault from "./CalendarDefault";
import styles from "./CalendarContainer.module.scss";
import { useDayContext } from "../../contexts/dayContext";
import CalendarSelector from "./CalendarSelector/CalendarSelector";
import { useShowDateContext } from "../../contexts/showDateContext";
import useCalendar from "../../hooks/useCalendar";
import { useCalendarVisible } from "../../hooks/useCalendarVisible";

const CalendarContainer = ({ startDate, endDate, locales }) => {
  const { showDate, setMonthHandler, setYearHandler } = useShowDateContext();

  const { setHoverDay } = useDayContext();

  const nextMonth = useMemo(() => getNextMonth(showDate), [showDate]);

  const changeMonthHandler = useCallback((month) => setMonthHandler(month), [
    setMonthHandler,
  ]);
  const changeYearHandler = useCallback((year) => setYearHandler(year), [
    setYearHandler,
  ]);

  const calendarLeft = useCalendar(showDate, startDate, endDate);

  const calendarRight = useCalendar(nextMonth, startDate, endDate);

  const { calendarLeftDays, calendarRightDays } = useCalendarVisible(
    calendarLeft,
    calendarRight
  );

  return (
    <div
      className={styles.calendar_container}
      onMouseLeave={setHoverDay.bind(this, null)}
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
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  locales: PropTypes.string,
};

export default CalendarContainer;
