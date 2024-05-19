import React from 'react';
import s from './recipeCard.module.scss';
import Image from 'next/image';
import Link from 'next/link';

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
					<div className={s.recipeCardParams__param}>
						<Image src={'/clock.svg'} height={20} width={20} alt='clock' />
						<p>1h 5min</p>
					</div>
					<div className={s.recipeCardParams__param}>
						<Image src={'/calories.svg'} height={20} width={20} alt='calories' />
						<p>300 Calories</p>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default RecipeCard;
