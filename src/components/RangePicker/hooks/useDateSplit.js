import { useMemo } from "react";

export default function useDateSplit(date) {
  const dateDto = useMemo(
    () => ({
      year: date.getFullYear(),
      month: date.getMonth(),
      date: date.getDate(),
      hour: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds(),
    }),
    [date]
  );

  return {
    ...dateDto,
  };
}
