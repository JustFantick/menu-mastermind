'use client';
import React from 'react';
import Searchbar from '@/components/searchbar/Searchbar';
import Image from 'next/image';
import styles from './page.module.scss';
import { useRouter } from 'next/navigation';

const MainSection = () => {
	const router = useRouter();
	function onSearchbarSubmit(reqText: string) {
		router.push(`/search?query=${reqText}`);
	}

	return (
		<section className={styles.home__section}>
			<Image src={'/home-bg_2.png'} alt='home-bg' layout='fill' objectFit='cover' className={styles.sectionBackground} />
			<div className={styles.overlay}></div>

			<Searchbar onSubmit={onSearchbarSubmit} />
		</section>
	);
};

export default MainSection;
