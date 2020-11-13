import { useMemo } from "react";

export const useCalendarVisible = (calendars) =>
  useMemo(() => {
    const prepareCalendar = calendars.map(
      ({ prevMonth, currentMonth, nextMonth }) => ({
        days: [
          ...prevMonth.days,
          ...currentMonth.days.map((day) => ({
            ...day,
            isCurrentMonth: true,
          })),
          ...nextMonth.days,
        ],
        startIndex:
          prevMonth.days.length + 1 - currentMonth.firsDayOfWeekByMonth,
        weekCount: currentMonth.weekCount,
        daysCount: currentMonth.days.length,
        firsDayOfWeekByMonth: currentMonth.firsDayOfWeekByMonth,
        nextMonthFirsDayOfWeekByMonth: nextMonth.firsDayOfWeekByMonth,
      })
    );

    const calendar = prepareCalendar.reduce(
      (res, calendar) =>
        !res || res.weekCount < calendar.weekCount ? calendar : res,
      null
    );

    const indexEnd =
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
