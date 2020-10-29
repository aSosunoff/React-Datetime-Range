import { useMemo } from "react";

export const useCalendarVisible = (calendarLeft, calendarRight) =>
  useMemo(() => {
    const leftCalendarIndexStart =
      calendarLeft.startIndexCurentMonth - calendarLeft.firsDayOfWeekByMonth;

    const rightCalendarIndexStart =
      calendarRight.startIndexCurentMonth - calendarRight.firsDayOfWeekByMonth;

    let indexEnd = 0;

    if (calendarLeft.weekCount <= calendarRight.weekCount) {
      indexEnd =
        calendarRight.count +
        calendarRight.firsDayOfWeekByMonth +
        (8 - calendarRight.nextMonthFirsDayOfWeekByMonth) -
        1;
    } else if (calendarLeft.weekCount > calendarRight.weekCount) {
      indexEnd =
        calendarLeft.count +
        calendarLeft.firsDayOfWeekByMonth +
        (8 - calendarLeft.nextMonthFirsDayOfWeekByMonth) -
        1;
    }

    return {
      calendarLeftDays: calendarLeft.days.slice(
        leftCalendarIndexStart,
        leftCalendarIndexStart + indexEnd
      ),

      calendarRightDays: calendarRight.days.slice(
        rightCalendarIndexStart,
        rightCalendarIndexStart + indexEnd
      ),
    };
  }, [
    calendarLeft.count,
    calendarLeft.days,
    calendarLeft.firsDayOfWeekByMonth,
    calendarLeft.nextMonthFirsDayOfWeekByMonth,
    calendarLeft.startIndexCurentMonth,
    calendarLeft.weekCount,
    calendarRight.count,
    calendarRight.days,
    calendarRight.firsDayOfWeekByMonth,
    calendarRight.nextMonthFirsDayOfWeekByMonth,
    calendarRight.startIndexCurentMonth,
    calendarRight.weekCount,
  ]);
