import React from 'react';
import styles from './button.module.scss';

interface ButtonProps {
	children: React.ReactElement | String;
	type?: 'button' | 'submit' | 'reset';
}

const Button = ({ children, type = 'button' }: ButtonProps) => {
	return (
		<button type={type} className={styles.button}>
			{children}
		</button>
	);
};

export default Button;
