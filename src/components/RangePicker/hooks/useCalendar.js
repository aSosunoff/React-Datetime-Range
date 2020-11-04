import { useMemo } from "react";
import { useHoverDayContext } from "../contexts/hoverDayContext";
import { useRangeContext } from "../contexts/rangeContext";
import { useShowDateContext } from "../contexts/showDateContext";
import { getNextMonth } from "../utils/dateHalper";
import { prepareCalendar } from "../utils/prepareCalendar";
import { prepareHoverMonth } from "../utils/prepareHoverMonth";
import { useCalendarVisible } from "./useCalendarVisible";

export const useCalendar = () => {
  const { showDate } = useShowDateContext();

  const showCalendars = useMemo(
    () =>
      new Array(2)
        .fill(null)
        .reduce(
          (res) =>
            !res ? [showDate] : [...res, getNextMonth(res.slice(-1)[0])],
          null
        ),
    [showDate]
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

  const daysCalendar = useCalendarVisible(
    calendarsWithHoverDay.map(({ prepareCalendar }) => prepareCalendar)
  );

  return calendarsWithHoverDay.map((calendar, index) => ({
    date: calendar.month,
    days: daysCalendar[index],
  }));
};
