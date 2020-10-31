import { useCallback, useMemo } from "react";
import { useHoverDayContext } from "../contexts/hoverDayContext";
import { getNextMonth, getPrevMonth } from "../utils/dateHalper";
import useMonth from "./useMonth";

export default function useCalendar(
  month,
  startDateTimestamp,
  endDateTimestamp
) {
  const { days: prevDays } = useMonth(
    getPrevMonth(month),
    startDateTimestamp,
    endDateTimestamp
  );

  const { days: currentDays, firsDayOfWeekByMonth, weekCount } = useMonth(
    month,
    startDateTimestamp,
    endDateTimestamp
  );

  const {
    days: nextDays,
    firsDayOfWeekByMonth: nextMonthFirsDayOfWeekByMonth,
  } = useMonth(getNextMonth(month), startDateTimestamp, endDateTimestamp);

  const { hoverDayTimestamp } = useHoverDayContext();

  const mapDefault = useCallback(
    (fields) => ({
      ...fields,
      isStart: false,
      isBetween: false,
      isEnd: false,
      isThisDay: false,
      isCurrentMonth: false,
      isHoverBetween: false,
      isHoverStart: false,
    }),
    []
  );

  const _prevDays = useMemo(() => prevDays.map(mapDefault), [
    prevDays,
    mapDefault,
  ]);

  const _currentDays = useMemo(
    () =>
      currentDays.map((day) => {
        const isHoverBetween =
          startDateTimestamp &&
          hoverDayTimestamp &&
          !endDateTimestamp &&
          ((startDateTimestamp < day.dateTimestamp &&
            day.dateTimestamp <= hoverDayTimestamp) ||
            (startDateTimestamp > day.dateTimestamp &&
              day.dateTimestamp >= hoverDayTimestamp));

        return {
          ...day,
          isCurrentMonth: true,
          isHoverBetween,
          isHoverStart: hoverDayTimestamp === day.dateTimestamp,
        };
      }),
    [currentDays, endDateTimestamp, hoverDayTimestamp, startDateTimestamp]
  );

  const _nextDays = useMemo(() => nextDays.map(mapDefault), [
    mapDefault,
    nextDays,
  ]);

  const startIndexCurentMonth = useMemo(() => _prevDays.length + 1, [
    _prevDays.length,
  ]);

  const count = useMemo(() => _currentDays.length, [_currentDays.length]);

  return {
    days: [..._prevDays, ..._currentDays, ..._nextDays].map((day, index) => ({
      ...day,
      index,
    })),
    firsDayOfWeekByMonth,
    nextMonthFirsDayOfWeekByMonth,
    weekCount,
    startIndexCurentMonth,
    count,
  };
}
