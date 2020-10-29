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

  const {
    days: currentDays,
    firsDayOfWeekByMonth,
    weekCount: currentWeekCount,
  } = useMonth(month, startRangeTimestamp, endRangeTimestamp);

  const {
    days: nextDays,
    firsDayOfWeekByMonth: nextFirsDayOfWeekByMonth,
    weekCount: nextWeekCount,
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

  const _prevDays = useMemo(
    () =>
      firsDayOfWeekByMonth > 1
        ? prevDays.slice(-(firsDayOfWeekByMonth - 1)).map(mapDefault)
        : [],
    [prevDays, firsDayOfWeekByMonth, mapDefault]
  );

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

  const _nextDays = useMemo(
    () =>
      nextFirsDayOfWeekByMonth !== 1
        ? nextDays.slice(0, 8 - nextFirsDayOfWeekByMonth).map(mapDefault)
        : [],
    [mapDefault, nextDays, nextFirsDayOfWeekByMonth]
  );

  return {
    days: [..._prevDays, ..._currentDays, ..._nextDays].map((day, index) => ({
      ...day,
      index,
    })),
  };
}
