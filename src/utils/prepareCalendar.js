import { getNextMonth, getPrevMonth } from "../utils/dateHalper";
import { compose } from "../utils/compose";
import { partial } from "../utils/partial";
import { prepareMonth } from "../utils/prepareMonth";
import prepareMonthRange from "../utils/prepareMonthRange";

export const prepareCalendar = (
  startDateTimestamp,
  endDateTimestamp,
  month
) => ({
  prevMonth: compose(prepareMonth, getPrevMonth)(month),
  currentMonth: compose(
    partial(prepareMonthRange, startDateTimestamp, endDateTimestamp),
    prepareMonth
  )(month),
  nextMonth: compose(prepareMonth, getNextMonth)(month),
});
