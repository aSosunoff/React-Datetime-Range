import { useMemo } from "react";
import { useHoverDayContext } from "../contexts/hoverDayContext";

export default function useHoverCurrentMonth(
  days,
  startDateTimestamp,
  endDateTimestamp
) {
  const { hoverDayTimestamp } = useHoverDayContext();

  return useMemo(
    () =>
      days.map((day) => ({
        ...day,
        isHoverBetween:
          startDateTimestamp &&
          hoverDayTimestamp &&
          !endDateTimestamp &&
          ((startDateTimestamp < day.dateTimestamp &&
            day.dateTimestamp <= hoverDayTimestamp) ||
            (startDateTimestamp > day.dateTimestamp &&
              day.dateTimestamp >= hoverDayTimestamp)),
        isHoverStart: hoverDayTimestamp === day.dateTimestamp,
      })),
    [endDateTimestamp, hoverDayTimestamp, days, startDateTimestamp]
  );
}
