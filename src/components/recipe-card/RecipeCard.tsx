import React from 'react';
import s from './recipeCard.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import Param from './Param';

interface RecipeCardProps {
	href: string;
	title: string;
	image: string;
	time: string;
	calories: string;
}

const RecipeCard = ({ href, title, image, time, calories }: RecipeCardProps) => {
	return (
		<Link href={href} className={s.recipeCard}>
			<Image src={'/recipe-img.png'} height={196} width={270} alt='recipe-img' className={s.recipeCard__img} />

			<div className={s.recipeCard__textContent}>
				<div className={s.recipeCard__title}>Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs</div>
				<div className={s.recipeCardParams}>
					<Param imgSrc='/clock.svg' text='1h 5min' />
					<Param imgSrc='/calories.svg' text='300 Calories' />
				</div>
			</div>
		</Link>
	);
};

export default RecipeCard;
