import { getDateWithoutTime } from "../utils/dateHalper";

export default function prepareMonthRange(
  startRangeTimestamp,
  endRangeTimestamp,
  monthPrapare
) {
  const isStart = (dateTimestamp) => startRangeTimestamp === dateTimestamp;

  const isEnd = (dateTimestamp) => endRangeTimestamp === dateTimestamp;

  const isBetween = (dateTimestamp) =>
    startRangeTimestamp &&
    endRangeTimestamp &&
    startRangeTimestamp < dateTimestamp &&
    dateTimestamp < endRangeTimestamp;

  const isThisDay = (dateTimestamp) =>
    getDateWithoutTime(new Date()).getTime() === dateTimestamp;

  return {
    ...monthPrapare,
    days: monthPrapare.days.map((day) => ({
      ...day,
      isStart: isStart(day.dateTimestamp),
      isBetween: isBetween(day.dateTimestamp),
      isEnd: isEnd(day.dateTimestamp),
      isThisDay: isThisDay(day.dateTimestamp),
    })),
  };
}
