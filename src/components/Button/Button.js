import React from "react";
import styles from "./Button.module.css";

const Button = React.forwardRef(({ children, onClick = () => {} }, ref) => (
	<button ref={ref} className={styles.button} onClick={onClick}>
		{children}
	</button>
));

export default Button;
