import { useMemo } from "react";

export const useCalendarVisible = (calendarLeft, calendarRight) =>
  useMemo(() => {
    debugger;
    const leftDays = [
      ...calendarLeft.prevMonth.days,
      ...calendarLeft.currentMonth.days.map((day) => ({
        ...day,
        isCurrentMonth: true,
      })),
      ...calendarLeft.nextMonth.days,
    ];

    const startIndexLeftMonth = calendarLeft.prevMonth.days.length + 1;

    const rightDays = [
      ...calendarRight.prevMonth.days,
      ...calendarRight.currentMonth.days.map((day) => ({
        ...day,
        isCurrentMonth: true,
      })),
      ...calendarRight.nextMonth.days,
    ];

    const startIndexRightMonth = calendarLeft.prevMonth.days.length + 1;

    const leftCalendarIndexStart =
      startIndexLeftMonth - calendarLeft.currentMonth.firsDayOfWeekByMonth;

    const rightCalendarIndexStart =
      startIndexRightMonth - calendarRight.currentMonth.firsDayOfWeekByMonth;

    let indexEnd = 0;

    if (
      calendarLeft.currentMonth.weekCount <=
      calendarRight.currentMonth.weekCount
    ) {
      indexEnd =
        calendarRight.currentMonth.days.length +
        calendarRight.currentMonth.firsDayOfWeekByMonth +
        (8 - calendarRight.nextMonth.firsDayOfWeekByMonth) -
        1;
    } else if (
      calendarLeft.currentMonth.weekCount > calendarRight.currentMonth.weekCount
    ) {
      indexEnd =
        calendarLeft.currentMonth.days.length +
        calendarLeft.currentMonth.firsDayOfWeekByMonth +
        (8 - calendarLeft.nextMonth.firsDayOfWeekByMonth) -
        1;
    }

    return {
      calendarLeftDays: leftDays
        .slice(leftCalendarIndexStart, leftCalendarIndexStart + indexEnd)
        .map((day, index) => ({ ...day, index })),

      calendarRightDays: rightDays
        .slice(rightCalendarIndexStart, rightCalendarIndexStart + indexEnd)
        .map((day, index) => ({ ...day, index })),
    };
  }, [
    calendarLeft.currentMonth.days,
    calendarLeft.currentMonth.firsDayOfWeekByMonth,
    calendarLeft.currentMonth.weekCount,
    calendarLeft.nextMonth.days,
    calendarLeft.nextMonth.firsDayOfWeekByMonth,
    calendarLeft.prevMonth.days,
    calendarRight.currentMonth.days,
    calendarRight.currentMonth.firsDayOfWeekByMonth,
    calendarRight.currentMonth.weekCount,
    calendarRight.nextMonth.days,
    calendarRight.nextMonth.firsDayOfWeekByMonth,
    calendarRight.prevMonth.days,
  ]);
