'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styles from './searchbar.module.scss';

interface SearchbarProps {
	defaultValue?: string;
	placeholder?: string;
	onSubmit: (value: string) => void;
}

const Searchbar = ({ defaultValue, placeholder, onSubmit }: SearchbarProps) => {
	const [inputValue, setInputValue] = useState<string>(defaultValue || '');

	useEffect(() => {
		setInputValue(defaultValue || '');
	}, [defaultValue]);

	function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
		setInputValue(e.target.value);
	}

	return (
		<form
			className={styles.searchbar}
			onSubmit={e => {
				e.preventDefault();
				if (inputValue !== '') onSubmit(inputValue);
			}}
		>
			<input
				className={styles.searchbar__input}
				type='text'
				name='search'
				placeholder={placeholder ? placeholder : 'Search'}
				value={inputValue}
				onChange={e => onChangeHandler(e)}
			/>

			<div className={styles.searchbar__imgSection}>
				<Image src={'/faq-icon.svg'} height={35} width={35} alt='faq-icon' />
			</div>
		</form>
	);
};

export default Searchbar;
