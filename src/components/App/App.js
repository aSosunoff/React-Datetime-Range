import React, { useCallback, useMemo, useRef, useState } from "react";
import Button from "../Button/Button";
import RangePicker from "../RangePicker";

const format = (date) =>
  date.toLocaleString("ru", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const App = () => {
  const targetButton = useRef(null);

  const [isOpen, setOpen] = useState(false);

  const [range, setRange] = useState({ from: null, to: null });

  const displayRange = useMemo(
    () =>
      range.from && range.to
        ? `${format(range.from)} - ${format(range.to)}`
        : null,
    [range.from, range.to]
  );

  const toggleRangePicker = useCallback(() => setOpen((isOpen) => !isOpen), []);

  const closeRangePicker = useCallback(() => setOpen(false), []);

  return (
    <>
      <Button ref={targetButton} onClick={toggleRangePicker}>
        {displayRange || "Открыть"}
      </Button>

      <RangePicker
        isOpen={isOpen}
        {...range}
        onRangeSelected={setRange}
        target={targetButton.current}
        onClose={closeRangePicker}
      />
    </>
  );
};

export default App;
