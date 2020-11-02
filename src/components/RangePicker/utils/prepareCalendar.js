import { getNextMonth, getPrevMonth } from "../utils/dateHalper";
import { compose } from "../utils/compose";
import { partial } from "../utils/partial";
import { prepareMonth } from "../utils/prepareMonth";
import { prepareHoverMonth } from "../utils/prepareHoverMonth";
import prepareMonthRange from "../utils/prepareMonthRange";

export const prepareCalendar = (
  startDateTimestamp,
  endDateTimestamp,
  hoverDayTimestamp,
  month
) => {
  console.log(1);
  return {
    prevMonth: compose(prepareMonth, getPrevMonth)(month),
    currentMonth: compose(
      partial(
        prepareHoverMonth,
        startDateTimestamp,
        endDateTimestamp,
        hoverDayTimestamp
      ),
      partial(prepareMonthRange, startDateTimestamp, endDateTimestamp),
      prepareMonth
    )(month),
    nextMonth: compose(prepareMonth, getNextMonth)(month),
  };
};
