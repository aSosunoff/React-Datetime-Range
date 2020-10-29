import { useCallback, useMemo } from "react";
import { useDayContext } from "../contexts/dayContext";
import {
  getDateWithoutTime,
  getNextMonth,
  getPrevMonth,
} from "../utils/dateHalper";
import useMonth from "./useMonth";

export default function useCalendar(month, from, to) {
  const startRangeTimestamp = useMemo(
    () => from && getDateWithoutTime(from).getTime(),
    [from]
  );

  const endRangeTimestamp = useMemo(
    () => to && getDateWithoutTime(to).getTime(),
    [to]
  );

  const { days: prevDays } = useMonth(
    getPrevMonth(month),
    startRangeTimestamp,
    endRangeTimestamp
  );

  const { days: currentDays, firsDayOfWeekByMonth, weekCount } = useMonth(
    month,
    startRangeTimestamp,
    endRangeTimestamp
  );

  const {
    days: nextDays,
    firsDayOfWeekByMonth: nextMonthFirsDayOfWeekByMonth,
  } = useMonth(getNextMonth(month), startRangeTimestamp, endRangeTimestamp);

  const { hoverDay } = useDayContext();

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
          startRangeTimestamp &&
          hoverDay &&
          !endRangeTimestamp &&
          ((startRangeTimestamp < day.dateTimestamp &&
            day.dateTimestamp <= hoverDay.getTime()) ||
            (startRangeTimestamp > day.dateTimestamp &&
              day.dateTimestamp >= hoverDay.getTime()));

        return {
          ...day,
          isCurrentMonth: true,
          isHoverBetween,
          isHoverStart: hoverDay && hoverDay.getTime() === day.dateTimestamp,
        };
      }),
    [currentDays, endRangeTimestamp, hoverDay, startRangeTimestamp]
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
