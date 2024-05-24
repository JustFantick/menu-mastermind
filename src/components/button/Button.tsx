import React from 'react';
import styles from './button.module.scss';

interface ButtonProps {
	children: React.ReactElement | String;
	type?: 'button' | 'submit' | 'reset';
	onCLick?: () => void;
}

const Button = ({ children, type = 'button', onCLick }: ButtonProps) => {
	return (
		<button type={type} className={styles.button} onClick={onCLick}>
			{children}
		</button>
	);
};

export default Button;
