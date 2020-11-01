import { useMemo } from "react";
import { useHoverDayContext } from "../contexts/hoverDayContext";
import { getNextMonth, getPrevMonth } from "../utils/dateHalper";
import useMonth from "./useMonth";
import useMonthRange from "./useMonthRange";

export default function useCalendar(
  month,
  startDateTimestamp,
  endDateTimestamp
) {
  const currentMonth = useMonthRange(
    month,
    startDateTimestamp,
    endDateTimestamp
  );

  const { hoverDayTimestamp } = useHoverDayContext();

  const currentDays = useMemo(
    () =>
      currentMonth.days.map((day) => {
        const isHoverBetween =
          startDateTimestamp &&
          hoverDayTimestamp &&
          !endDateTimestamp &&
          ((startDateTimestamp < day.dateTimestamp &&
            day.dateTimestamp <= hoverDayTimestamp) ||
            (startDateTimestamp > day.dateTimestamp &&
              day.dateTimestamp >= hoverDayTimestamp));

        return {
          ...day,
          isHoverBetween,
          isHoverStart: hoverDayTimestamp === day.dateTimestamp,
        };
      }),
    [currentMonth.days, endDateTimestamp, hoverDayTimestamp, startDateTimestamp]
  );

  return {
    prevMonth: useMonth(
      getPrevMonth(month),
      startDateTimestamp,
      endDateTimestamp
    ),
    currentMonth: {
      ...currentMonth,
      days: currentDays,
    },
    nextMonth: useMonth(
      getNextMonth(month),
      startDateTimestamp,
      endDateTimestamp
    ),
  };
}
