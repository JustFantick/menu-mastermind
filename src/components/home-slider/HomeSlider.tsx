'use client';
import Image from 'next/image';
import React from 'react';
import { Recipe } from '@/app/page';
import styles from './homeSlider.module.scss';

interface HomeSliderProps {
	recipes: Recipe[];
}

const HomeSlider = ({ recipes }: HomeSliderProps) => {
	return (
		<div className={styles.recipesSlider}>
			{recipes.map(recipe => (
				<Image src={recipe.image} alt={`Recipe ${recipe.id}`} width={250} height={250} layout='responsive' />
			))}
		</div>
	);
};

export default HomeSlider;
