import { useMemo } from "react";

const getAllDays = (calendar) => ({
  days: [
    ...calendar.prevMonth.days,
    ...calendar.currentMonth.days.map((day) => ({
      ...day,
      isCurrentMonth: true,
    })),
    ...calendar.nextMonth.days,
  ],
  startIndex:
    calendar.prevMonth.days.length +
    1 -
    calendar.currentMonth.firsDayOfWeekByMonth,
  weekCount: calendar.currentMonth.weekCount,
  daysCount: calendar.currentMonth.days.length,
  firsDayOfWeekByMonth: calendar.currentMonth.firsDayOfWeekByMonth,
  nextMonthFirsDayOfWeekByMonth: calendar.nextMonth.firsDayOfWeekByMonth,
});

export const useCalendarVisible = (...calendars) =>
  useMemo(() => {
    const prepareCalendar = calendars.map(getAllDays);

    const calendar = prepareCalendar.reduce(
      (res, calendar) =>
        !res || res.weekCount < calendar.weekCount ? calendar : res,
      null
    );

    let indexEnd =
      calendar.daysCount +
      calendar.firsDayOfWeekByMonth +
      (8 - calendar.nextMonthFirsDayOfWeekByMonth) -
      1;

    return prepareCalendar.map((calendar) =>
      calendar.days
        .slice(calendar.startIndex, calendar.startIndex + indexEnd)
        .map((day, index) => ({ ...day, index }))
    );
  }, [calendars]);
