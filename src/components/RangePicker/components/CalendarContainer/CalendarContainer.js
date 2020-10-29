import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { getNextMonth } from "../../utils/dateHalper";
import CalendarDefault from "./CalendarDefault";
import styles from "./CalendarContainer.module.scss";
import { useDayContext } from "../../contexts/dayContext";
import CalendarSelector from "./CalendarSelector/CalendarSelector";
import { useShowDateContext } from "../../contexts/showDateContext";

const CalendarContainer = ({ startDate, endDate, locales }) => {
  const { showDate, setMonthHandler, setYearHandler } = useShowDateContext();

  const nextMonth = useMemo(() => getNextMonth(showDate), [showDate]);

  const { setHoverDay } = useDayContext();

  const changeMonthHandler = useCallback((month) => setMonthHandler(month), [
    setMonthHandler,
  ]);

  const changeYearHandler = useCallback((year) => setYearHandler(year), [
    setYearHandler,
  ]);

  return (
    <div
      className={styles.calendar_container}
      onMouseLeave={setHoverDay.bind(this, null)}
    >
      <CalendarSelector
        date={showDate}
        from={startDate}
        to={endDate}
        locales={locales}
        changeMonthHandler={changeMonthHandler}
        changeYearHandler={changeYearHandler}
      />
      <CalendarDefault
        date={nextMonth}
        from={startDate}
        to={endDate}
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
