import React from 'react';
import styles from './button.module.scss';

interface ButtonProps {
	children: React.ReactElement;
}

const Button = ({ children }: { children: React.ReactElement | String }) => {
	return (
		<button type='button' className={styles.button}>
			{children}
		</button>
	);
};

export default Button;
