import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { Transition } from "react-transition-group";

const Animation = ({ inProp, top, left, duration, children }) => {
  const defaultStyle = useMemo(
    () => ({
      transition: `
			opacity ${duration}ms ease-in-out,
			transform ${duration}ms ease-in-out,
			box-shadow .2s ease-out`,
      opacity: 0,
      transform: "translateY(50px)",
      left: "-10000px",
      top: "-10000px",
    }),
    [duration]
  );

  const transitionStyles = useMemo(
    () => ({
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
    }),
    [left, top]
  );

  const renderProps = useCallback(
    (state) => {
      return children({
        ...defaultStyle,
        ...transitionStyles[state],
      });
    },
    [children, defaultStyle, transitionStyles]
  );

  return (
    <Transition in={inProp} timeout={duration}>
      {renderProps}
    </Transition>
  );
};

Animation.defaultProps = {
  inProp: false,
  top: 0,
  left: 0,
  duration: 500,
  children: () => {},
};

Animation.propTypes = {
  inProp: PropTypes.bool,
  top: PropTypes.number,
  left: PropTypes.number,
  duration: PropTypes.number,
  children: PropTypes.func,
};

export default Animation;
