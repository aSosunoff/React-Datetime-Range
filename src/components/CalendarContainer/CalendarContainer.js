import React, { useCallback } from "react";
import PropTypes from "prop-types";
import styles from "./CalendarContainer.module.scss";
import {
  HoverDayProvider,
  useHoverDayContext,
} from "../../contexts/hoverDayContext";
import CalendarSelector from "./CalendarSelector/";
import { useShowDateContext } from "../../contexts/showDateContext";
import { withContext } from "../../HOC/withContext";
import { useCalendar } from "../../hooks/useCalendar";

const CalendarContainer = ({ locales }) => {
  const { setMonthHandler, setYearHandler } = useShowDateContext();

  const { setHoverDayTimestamp } = useHoverDayContext();

  const calendars = useCalendar(2);

  const changeMonthHandler = useCallback(
    (calendarNumber, month) => setMonthHandler(month - calendarNumber),
    [setMonthHandler]
  );

  return (
    <div
      className={styles.calendar_container}
      onMouseLeave={setHoverDayTimestamp.bind(this, null)}
      style={{
        gridTemplateColumns: `repeat(${calendars.length}, 1fr)`,
      }}
    >
      {calendars.map(({ date, days }, index) => (
        <CalendarSelector
          key={index}
          date={date}
          days={days}
          locales={locales}
          changeMonthHandler={changeMonthHandler.bind(this, index)}
          changeYearHandler={setYearHandler}
        />
      ))}
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
