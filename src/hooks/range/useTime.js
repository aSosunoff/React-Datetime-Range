import { useState, useEffect, useCallback, useMemo } from "react";

export default function useTime(startDate, endDate) {
  const startTimeString = useMemo(
    () => (startDate && startDate.toLocaleTimeString()) || "",
    [startDate]
  );

  const endTimeString = useMemo(
    () => (endDate && endDate.toLocaleTimeString()) || "",
    [endDate]
  );

  const [rangeTime, setTimeStringRange] = useState({
    startTimeString,
    endTimeString,
  });

  useEffect(
    () => setTimeStringRange(() => ({ startTimeString, endTimeString })),
    [startTimeString, endTimeString]
  );

  const setStartTimeStringHandler = useCallback(
    (startTimeString) =>
      setTimeStringRange((prev) => ({
        ...prev,
        startTimeString,
      })),
    []
  );

  const setEndTimeStringHandler = useCallback(
    (endTimeString) =>
      setTimeStringRange((prev) => ({
        ...prev,
        endTimeString,
      })),
    []
  );

  const resetHandler = useCallback(
    () =>
      setTimeStringRange(() => ({
        startTimeString: "",
        endTimeString: "",
      })),
    []
  );

  return {
    ...rangeTime,
    setStartTimeStringHandler,
    setEndTimeStringHandler,
    resetHandler,
  };
}
