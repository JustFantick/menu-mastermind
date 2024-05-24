import React, { Ref, forwardRef } from 'react';
import styles from './form.module.scss';

interface InputProps {
	type: 'password' | 'email' | 'text';
	label?: string;
	name: string;
	pattern?: string;
	title?: string;
	isRequired?: boolean;
	showError?: boolean;
	placeholder?: string;
}

const Input = forwardRef(function Input(
	{ label = '', type, name, pattern, title = '', isRequired = true, placeholder = '', showError = false }: InputProps,
	ref: Ref<HTMLInputElement>
) {
	return (
		<label className={styles.inputWrapper}>
			<div className={styles.inputWrapper__label}>{label}</div>

			<input
				className={`${styles.inputWrapper__input} ${showError && styles.error}`}
				ref={ref}
				type={type}
				name={name}
				pattern={pattern}
				title={title}
				required={isRequired}
				placeholder={placeholder}
			/>
		</label>
	);
});

export default Input;
