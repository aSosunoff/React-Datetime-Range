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
import { useCalendarVisible } from "../../hooks/useCalendarVisible";
import { useRangeContext } from "../../contexts/rangeContext";
import { withContext } from "../../HOC/withContext";
import CalendarSimple from "./CalendarSimple";
import { prepareCalendar } from "../../utils/prepareCalendar";

const CalendarContainer = ({ locales }) => {
  const { showDate, setMonthHandler, setYearHandler } = useShowDateContext();

  const { setHoverDayTimestamp } = useHoverDayContext();

  const nextMonth = useMemo(() => getNextMonth(showDate), [showDate]);

  const changeMonthHandler = useCallback(setMonthHandler, [setMonthHandler]);

  const changeYearHandler = useCallback(setYearHandler, [setYearHandler]);

  const { startDateTimestamp, endDateTimestamp } = useRangeContext();

  const { hoverDayTimestamp } = useHoverDayContext();

  const calendars = useMemo(
    () =>
      [showDate, nextMonth].map((month) => ({
        month,
        prepareCalendar: prepareCalendar(
          startDateTimestamp,
          endDateTimestamp,
          hoverDayTimestamp,
          month
        ),
      })),
    [
      endDateTimestamp,
      hoverDayTimestamp,
      nextMonth,
      showDate,
      startDateTimestamp,
    ]
  );

  const daysCalendar = useCalendarVisible(
    ...calendars.map(({ prepareCalendar }) => prepareCalendar)
  );

  return (
    <div
      className={styles.calendar_container}
      onMouseLeave={setHoverDayTimestamp.bind(this, null)}
    >
      {calendars.map((calendar, index) =>
        index === 0 ? (
          <CalendarSelector
            key={index}
            date={calendar.month}
            days={daysCalendar[index]}
            locales={locales}
            changeMonthHandler={changeMonthHandler}
            changeYearHandler={changeYearHandler}
          />
        ) : (
          <CalendarSimple
            key={index}
            date={calendar.month}
            days={daysCalendar[index]}
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
