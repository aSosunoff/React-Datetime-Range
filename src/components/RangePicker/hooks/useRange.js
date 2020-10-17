import { useState, useEffect, useCallback } from "react";

export default function useRange(from, to) {
  const [range, setRange] = useState({ from, to });

  useEffect(() => {
    setRange({ from, to });
  }, [from, to]);

  const rangeResetHandler = useCallback(
    () => setRange({ from: null, to: null }),
    [setRange]
  );

  return {
    range,
    setRange,
    rangeResetHandler,
  };
}
