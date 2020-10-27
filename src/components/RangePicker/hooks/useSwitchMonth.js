import { useCallback, useState } from "react";
import { getNextMonth, getPrevMonth } from "../utils/dateHalper";

export default function useSwitchMonth(date) {
  const [month, setMonth] = useState(date ?? new Date());

  const nextMonthHandler = useCallback(
    () => setMonth((prev) => getNextMonth(prev)),
    []
  );

  const prevMonthHandler = useCallback(
    () => setMonth((prev) => getPrevMonth(prev)),
    []
  );

  const setMonthHandler = useCallback(
    (month) => setMonth((prev) => new Date(prev.setMonth(month))),
    []
  );

  const setYearHandler = useCallback(
    (year) => setMonth((prev) => new Date(prev.setFullYear(year))),
    []
  );

  return {
    month,
    nextMonthHandler,
    prevMonthHandler,
    setMonthHandler,
    setYearHandler,
  };
}
