import { useMemo } from "react";
import { useHoverDayContext } from "../contexts/hoverDayContext";
import { prepareCalendar } from "../utils/prepareCalendar";

export default function useCalendar(
  startDateTimestamp,
  endDateTimestamp,
  month
) {
  const { hoverDayTimestamp } = useHoverDayContext();

  return useMemo(
    () =>
      prepareCalendar(
        startDateTimestamp,
        endDateTimestamp,
        hoverDayTimestamp,
        month
      ),
    [endDateTimestamp, hoverDayTimestamp, month, startDateTimestamp]
  );
}
