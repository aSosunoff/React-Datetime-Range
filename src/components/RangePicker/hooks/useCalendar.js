import { getNextMonth, getPrevMonth } from "../utils/dateHalper";
import useMonth from "./useMonth";
import useMonthRange from "./useMonthRange";

export default function useCalendar(
  month,
  startDateTimestamp,
  endDateTimestamp
) {
  const prevMonth = useMonth(
    getPrevMonth(month),
    startDateTimestamp,
    endDateTimestamp
  );

  const nextMonth = useMonth(
    getNextMonth(month),
    startDateTimestamp,
    endDateTimestamp
  );

  const currentMonth = useMonthRange(
    month,
    startDateTimestamp,
    endDateTimestamp
  );

  return {
    prevMonth,
    currentMonth,
    nextMonth,
  };
}
