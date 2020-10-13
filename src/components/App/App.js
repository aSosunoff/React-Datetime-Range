import React, { useMemo, useRef, useState } from "react";
import RangePicker from "../RangePicker/RangePicker";

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

	const setRangeHandler = ({ from, to }) => {
		setRange({ from, to });
	};

	const displayRange = useMemo(
		() =>
			range.from && range.to
				? `${format(range.from)} - ${format(range.to)}`
				: null,
		[range.from, range.to]
	);

	return (
		<>
			<button
				ref={targetButton}
				id="button-open"
				onClick={() => {
					setOpen(!isOpen);
				}}
			>
				{displayRange || "Открыть"}
			</button>

			<RangePicker
				isOpen={isOpen}
				{...range}
				onRangeSelected={setRangeHandler}
				target={targetButton.current}
				onClose={() => setOpen(false)}
			/>
		</>
	);
};

export default App;
