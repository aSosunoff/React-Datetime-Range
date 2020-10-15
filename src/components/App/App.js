import React, { useMemo, useRef, useState } from "react";
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

	const setRangeHandler = ({ from, to }) => setRange({ from, to });

	const toggleRangePicker = () => setOpen(!isOpen);

	const closeRangePicker = () => setOpen(false);

	return (
		<>
			<button ref={targetButton} id="button-open" onClick={toggleRangePicker}>
				{displayRange || "Открыть"}
			</button>

			<RangePicker
				isOpen={isOpen}
				{...range}
				onRangeSelected={setRangeHandler}
				target={targetButton.current}
				onClose={closeRangePicker}
			/>
		</>
	);
};

export default App;
