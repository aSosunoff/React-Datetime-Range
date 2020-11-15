import React from "react";
import styles from "./Button.module.scss";

const Button = React.forwardRef(({ children, onClick = () => {} }, ref) => (
  <button ref={ref} className={styles.button} onClick={onClick} type="button">
    {children}
  </button>
));

export default Button;
