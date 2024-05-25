import React from 'react';
import s from './recipeCard.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import Param from './Param';

interface RecipeCardProps {
	href: string;
	title: string;
	image: string;
	numberInMinutes: number;
	calories: number;
}

const RecipeCard = ({ href, title, image, numberInMinutes, calories }: RecipeCardProps) => {
	return (
		<Link href={href} className={s.recipeCard}>
			<Image src={image} height={196} width={270} alt='recipe-img' className={s.recipeCard__img} />

			<div className={s.recipeCard__textContent}>
				<div className={s.recipeCard__title}>{title}</div>
				<div className={s.recipeCardParams}>
					<Param imgSrc='/clock.svg' text={`${numberInMinutes} minutes`} />
					<Param imgSrc='/calories.svg' text={`${calories} calories`} />
				</div>
			</div>
		</Link>
	);
};

export default RecipeCard;
