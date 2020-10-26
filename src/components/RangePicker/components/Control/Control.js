import React from "react";
import PropTypes from "prop-types";
import styles from "./Control.module.scss";

const Control = ({ prevHandler, nextHandler }) => (
  <>
    <div
      className={styles.control_left}
      onClick={prevHandler}
      data-test-id="control-left"
    />
    <div
      className={styles.control_right}
      onClick={nextHandler}
      data-test-id="control-right"
    />
  </>
);

Control.defaultProps = {
  prevHandler: () => {},
  nextHandler: () => {},
};

Control.propTypes = {
  prevHandler: PropTypes.func,
  nextHandler: PropTypes.func,
};

export default Control;
