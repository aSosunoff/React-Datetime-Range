import React from "react";
import PropTypes from "prop-types";
import styles from "./ArrowDefault.module.scss";
import cn from "classnames";

const ArrowDefault = ({ onClick, style, className }) => {
  return (
    <div
      className={cn(styles.arrow, className)}
      style={style}
      onClick={onClick}
    />
  );
};

ArrowDefault.defaultProps = {
  onClick: () => {},
};

ArrowDefault.propTypes = {
  onClick: PropTypes.func,
};

export default ArrowDefault;
