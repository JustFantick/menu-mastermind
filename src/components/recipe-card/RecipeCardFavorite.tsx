import Image from 'next/image';
import React from 'react';
import s from './recipeCard.module.scss';
import Category from './Category';
import Param from './Param';
import Link from 'next/link';

interface RecipeCardFavoriteProps {
	recipeId: number;
	title: string;
	imageUrl: string;
	category: string[];
	time: string;
	calories: string;
}

const RecipeCardFavorite = ({ recipeId, imageUrl, title, category, time, calories }: RecipeCardFavoriteProps) => {
	return (
		<Link href={`./recipe/${recipeId}`} className={s.recipeCardFavorite}>
			<Image src={imageUrl} height={100} width={135} alt='recipe-img' />
			<div className={s.recipeCardFavorite__description}>
				<h4>{title}</h4>
				<div className={s.recipeCardFavorite__row}>
					{category.map((text, id) => (
						<Category text={text} key={id} />
					))}
				</div>

				<div className={s.recipeCardFavorite__row}>
					<Param imgSrc='/clock.svg' text={time} />
					<Param imgSrc='/calories.svg' text={calories} />
				</div>
			</div>
		</Link>
	);
};

export default RecipeCardFavorite;
