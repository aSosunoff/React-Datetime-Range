import { useMemo } from "react";
import { getNextMonth, getPrevMonth } from "../utils/dateHalper";
import { compose } from "../utils/compose";
import { partial } from "../utils/partial";
import { prepareMonth } from "../utils/prepareMonth";
import { prepareHoverMonth } from "../utils/prepareHoverMonth";
import prepareMonthRange from "../utils/prepareMonthRange";
import { useHoverDayContext } from "../contexts/hoverDayContext";

export default function useCalendar(
  startDateTimestamp,
  endDateTimestamp,
  month
) {
  const { hoverDayTimestamp } = useHoverDayContext();

  const prevMonth = useMemo(() => compose(prepareMonth, getPrevMonth)(month), [
    month,
  ]);

  const currentMonth = useMemo(
    () =>
      compose(
        partial(
          prepareHoverMonth,
          startDateTimestamp,
          endDateTimestamp,
          hoverDayTimestamp
        ),
        partial(prepareMonthRange, startDateTimestamp, endDateTimestamp),
        prepareMonth
      )(month),
    [endDateTimestamp, hoverDayTimestamp, month, startDateTimestamp]
  );

  const nextMonth = useMemo(() => compose(prepareMonth, getNextMonth)(month), [
    month,
  ]);

  return {
    prevMonth,
    currentMonth,
    nextMonth,
  };
}
