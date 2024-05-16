'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import styles from './searchbar.module.scss';

interface SearchbarProps {
	defaultValue?: string;
	placeholder?: string;
	onSubmit?: (value: String) => void;
}

const Searchbar = ({ defaultValue, placeholder, onSubmit }: SearchbarProps) => {
	const [inputValue, setInputValue] = useState(defaultValue || '');

	function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
		setInputValue(e.target.value);
	}

	function onKeyPressHandler(e: React.KeyboardEvent<HTMLInputElement>) {
		if (!onSubmit) return;

		if (e.key === 'Enter') {
			onSubmit(inputValue);
		}
	}

	return (
		<label className={styles.searchbar}>
			<input
				type='text'
				name='search'
				placeholder={placeholder ? placeholder : 'Search'}
				defaultValue={defaultValue && defaultValue}
				className={styles.searchbar__input}
				onChange={e => onChangeHandler(e)}
				onKeyDown={onKeyPressHandler}
			/>

			<div className={styles.searchbar__imgSection}>
				<Image src={'/faq-icon.svg'} height={35} width={35} alt='faq-icon' />
			</div>
		</label>
	);
};

export default Searchbar;
