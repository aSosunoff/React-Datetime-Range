import { useMemo } from "react";
import { useHoverDayContext } from "../contexts/hoverDayContext";

export default function useHoverCurrentMonth(
  month,
  startDateTimestamp,
  endDateTimestamp
) {
  const { hoverDayTimestamp } = useHoverDayContext();

  return useMemo(
    () =>
      month.days.map((day) => {
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
    [endDateTimestamp, hoverDayTimestamp, month.days, startDateTimestamp]
  );
}
