import React from "react";
import PropTypes from "prop-types";
import styles from "./Select.module.scss";

const Select = ({ value, onChange, items }) => {
  return (
    <select className={styles.select} value={value} onChange={onChange}>
      {items.map((item) => (
        <option key={item.id} value={item.value}>
          {item.text || item.value}
        </option>
      ))}
    </select>
  );
};

Select.defaultProps = {};

Select.propTypes = {
  items: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Select;
