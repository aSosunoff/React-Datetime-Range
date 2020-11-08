import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import styles from "./Select.module.scss";
import { ArrowBottom } from "../Arrow/";

const Select = ({ value, onChange, items }) => {
  const [isVisible, setVisible] = useState(false);
  const showHandler = useCallback(() => setVisible(true), []);
  const hideHandler = useCallback(() => setVisible(false), []);

  return (
    <div
      className={styles.select_container}
      onMouseOver={showHandler}
      onMouseOut={hideHandler}
    >
      <select className={styles.select} value={value} onChange={onChange}>
        {items.map((item) => (
          <option key={item.id} value={item.value}>
            {item.text || item.value}
          </option>
        ))}
      </select>

      <ArrowBottom
        style={{
          top: "12px",
          right: "0px",
          opacity: isVisible ? 1 : 0,
        }}
      />
    </div>
  );
};

Select.defaultProps = {};

Select.propTypes = {
  items: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Select;
