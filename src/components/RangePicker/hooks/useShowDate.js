import { useCallback, useState } from "react";
import { getNextMonth, getPrevMonth } from "../utils/dateHalper";

export default function useShowDate(date) {
  const [showDate, setShowDate] = useState(date ?? new Date());

  const nextMonthHandler = useCallback(
    () => setShowDate((prev) => getNextMonth(prev)),
    []
  );

  const prevMonthHandler = useCallback(
    () => setShowDate((prev) => getPrevMonth(prev)),
    []
  );

  const setMonthHandler = useCallback(
    (month) =>
      setShowDate(
        (prev) => new Date(prev.getFullYear(), month, prev.getDate())
      ),
    []
  );

  const setYearHandler = useCallback(
    (year) =>
      setShowDate((prev) => new Date(year, prev.getMonth(), prev.getDate())),
    []
  );

  return {
    showDate,
    nextMonthHandler,
    prevMonthHandler,
    setMonthHandler,
    setYearHandler,
  };
}
