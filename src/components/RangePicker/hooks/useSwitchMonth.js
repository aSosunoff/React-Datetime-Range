import { useCallback, useState } from "react";
import { getNextMonth, getPrevMonth } from "../utils/dateHalper";

export default function useSwitchMonth(date) {
  const [month, setMonth] = useState(date ?? new Date());

  const nextHandler = useCallback(
    () => setMonth((prev) => getNextMonth(prev)),
    []
  );

  const prevHandler = useCallback(
    () => setMonth((prev) => getPrevMonth(prev)),
    []
  );

  return {
    month,
    nextHandler,
    prevHandler,
  };
}
