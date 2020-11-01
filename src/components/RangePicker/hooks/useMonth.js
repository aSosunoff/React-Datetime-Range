import { useMemo } from "react";
import {
  getCountWeek,
  getMonthDayCount,
  getNumberFirsDayOfWeekByMonth,
} from "../utils/dateHalper";
import useDateSplit from "./useDateSplit";

export default function useMonth(month) {
  const { year: yearSplit, month: monthSplit } = useDateSplit(month);

  const firsDayOfWeekByMonth = useMemo(
    () => getNumberFirsDayOfWeekByMonth(month),
    [month]
  );

  const weekCount = useMemo(() => getCountWeek(month), [month]);

  const days = useMemo(
    () =>
      new Array(getMonthDayCount(month))
        .fill(null)
        .map((_, index) => index + 1)
        .map((number) => {
          const dateTimestamp = new Date(
            yearSplit,
            monthSplit,
            number
          ).getTime();

          return {
            number,
            date: new Date(dateTimestamp),
            dateTimestamp,
          };
        }),
    [month, yearSplit, monthSplit]
  );

  return {
    days,
    firsDayOfWeekByMonth,
    weekCount,
  };
}
