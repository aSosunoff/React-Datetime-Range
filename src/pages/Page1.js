import React, { useState, useEffect } from "react";
import classes from "./Page1.module.css";
import { RangePicker } from "../components/RangePicker";

export const Page1 = () => {
	const [isOpen, setOpen] = useState(false);
	const [target, setTarget] = useState(null);
	const closeHandler = () => setOpen(false);
	const toogleHandler = () => setOpen(!isOpen);

	useEffect(() => {
		setTarget(document.querySelector(`.${classes.btn}`));
	}, [isOpen]);

	return (
		<div>
			<RangePicker isOpen={isOpen} onClose={closeHandler} target={target} />
			<button className={classes.btn} onClick={toogleHandler}>
				Открыть
			</button>
		</div>
	);
};
