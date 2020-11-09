import { useMemo } from "react";
import { useHoverDayContext } from "../contexts/hoverDayContext";
import { useRangeContext } from "../contexts/rangeContext";
import { useShowDateContext } from "../contexts/showDateContext";
import { getNextMonth } from "../utils/dateHalper";
import { prepareCalendar } from "../utils/prepareCalendar";
import { prepareHoverMonth } from "../utils/prepareHoverMonth";
import { useCalendarVisible } from "./useCalendarVisible";

export const useCalendar = (countCalendars) => {
  const { showDate } = useShowDateContext();

  const showCalendars = useMemo(
    () =>
      new Array(countCalendars)
        .fill(null)
        .reduce(
          (res) =>
            !res ? [showDate] : [...res, getNextMonth(res.slice(-1)[0])],
          null
        ),
    [showDate, countCalendars]
  );

  const { startDateTimestamp, endDateTimestamp } = useRangeContext();

  const calendars = useMemo(
    () =>
      showCalendars.map((month) => ({
        month,
        prepareCalendar: prepareCalendar(
          startDateTimestamp,
          endDateTimestamp,
          month
        ),
      })),
    [endDateTimestamp, showCalendars, startDateTimestamp]
  );

  const { hoverDayTimestamp } = useHoverDayContext();

  const calendarsWithHoverDay = useMemo(
    () =>
      calendars.map((calendar) => ({
        ...calendar,
        prepareCalendar: {
          ...calendar.prepareCalendar,
          currentMonth: prepareHoverMonth(
            startDateTimestamp,
            endDateTimestamp,
            hoverDayTimestamp,
            calendar.prepareCalendar.currentMonth
          ),
        },
      })),
    [calendars, endDateTimestamp, hoverDayTimestamp, startDateTimestamp]
  );

  const calendarsWithHoverDayCalendar = useMemo(
    () => calendarsWithHoverDay.map(({ prepareCalendar }) => prepareCalendar),
    [calendarsWithHoverDay]
  );

  const daysCalendar = useCalendarVisible(calendarsWithHoverDayCalendar);

  return useMemo(
    () =>
      calendarsWithHoverDay.map((calendar, index) => ({
        date: calendar.month,
        days: daysCalendar[index],
      })),
    [calendarsWithHoverDay, daysCalendar]
  );
};
