import { useState, useEffect } from "react";

export default function useRange(from, to) {
  const [range, setRange] = useState({ from, to });

  useEffect(() => {
    setRange({ from, to });
  }, [from, to]);

  return {
    range,
    setRange,
  };
}
