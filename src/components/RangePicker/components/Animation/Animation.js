import React from "react";
import { Transition } from "react-transition-group";

const Animation = ({ inProp, top, left, children }) => {
	const duration = 500;

	const defaultStyle = {
		transition: `
			opacity ${duration}ms ease-in-out,
			transform ${duration}ms ease-in-out,
			box-shadow .2s ease-out`,
		opacity: 0,
		transform: "translateY(50px)",
		left: "-10000px",
		top: "-10000px",
	};

	const transitionStyles = {
		entering: {
			opacity: 1,
			transform: "translateY(0px)",
			left: `${left}px`,
			top: `${top}px`,
		},
		entered: {
			opacity: 1,
			transform: "translateY(0px)",
			left: `${left}px`,
			top: `${top}px`,
		},
		exiting: {
			left: `${left}px`,
			top: `${top}px`,
		},
		exited: {},
	};

	return (
		<Transition in={inProp} timeout={duration}>
			{(state) =>
				children({
					...defaultStyle,
					...transitionStyles[state],
				})
			}
		</Transition>
	);
};

export default Animation;
