import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import styles from "./ArrowDefault.module.scss";

const ArrowDefault = ({ onClick, style, className }) => (
  <div
    className={cn(styles.arrow, className)}
    style={style}
    onClick={onClick}
  />
);

ArrowDefault.defaultProps = {
  onClick: () => {},
};

ArrowDefault.propTypes = {
  onClick: PropTypes.func,
};

export default ArrowDefault;
