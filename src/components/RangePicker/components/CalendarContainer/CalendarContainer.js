import React from "react";
import PropTypes from "prop-types";
import styles from "./CalendarContainer.module.scss";
import {
  HoverDayProvider,
  useHoverDayContext,
} from "../../contexts/hoverDayContext";
import CalendarSelector from "./CalendarSelector/";
import { useShowDateContext } from "../../contexts/showDateContext";
import { withContext } from "../../HOC/withContext";
import CalendarSimple from "./CalendarSimple/";
import { useCalendar } from "../../hooks/useCalendar";

const CalendarContainer = ({ locales }) => {
  const { setMonthHandler, setYearHandler } = useShowDateContext();

  const { setHoverDayTimestamp } = useHoverDayContext();

  const calendars = useCalendar();

  return (
    <div
      className={styles.calendar_container}
      onMouseLeave={setHoverDayTimestamp.bind(this, null)}
      style={{
        gridTemplateColumns: `repeat(${calendars.length}, 1fr)`,
      }}
    >
      {calendars.map(({ date, days }, index) =>
        index === 0 ? (
          <CalendarSelector
            key={index}
            date={date}
            days={days}
            locales={locales}
            changeMonthHandler={setMonthHandler}
            changeYearHandler={setYearHandler}
          />
        ) : (
          <CalendarSimple
            key={index}
            date={date}
            days={days}
            locales={locales}
          />
        )
      )}
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
