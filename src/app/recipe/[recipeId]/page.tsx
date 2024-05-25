import React from 'react';
import s from './page.module.scss';
import Image from 'next/image';
import axios from 'axios';
import Category from '@/components/recipe-card/Category';
import Review from '@/components/review/Review';
import LeaveReviewForm from '@/components/review/LeaveReviewForm';

type Ingredient = {
	name: string;
	amount: number;
	unit: string;
};

type InstructionStep = {
	number: number;
	step: string;
};

type Recipe = {
	image: string;
	title: string;
	categories: string[];
	summary: string;
	readyInMinutes: number;
	preparationMinutes: number;
	cookingMinutes: number;
	ingredients: Ingredient[];
	instructions: string;
};

const categoriesKeysToCheck = [
	'vegetarian',
	'vegan',
	'glutenFree',
	'dairyFree',
	'veryHealthy',
	'cheap',
	'veryPopular',
	'sustainable',
	'lowFodmap',
];

const RecipePage = async ({ params }: { params: { recipeId: number } }) => {
	const recipeId = params.recipeId;

	const getRecipeById = async (id: number): Promise<Recipe> => {
		try {
			const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
				params: {
					apiKey: process.env.SPOONACULAR_API_KEY,
				},
			});

			const data = response.data;

			console.log(data);
			const categories = Object.keys(data).filter(key => data[key] === true);

			const ingredients: Ingredient[] = data.extendedIngredients.map((ingredient: any) => ({
				name: ingredient.originalName,
				amount: ingredient.amount,
				unit: ingredient.unit,
			}));

			console.log(data.analyzedInstructions[0]?.steps);
			const instructions: string = data.analyzedInstructions[0]?.steps.map((step: any) => step.step).join(' ') || '';

			const recipe: Recipe = {
				image: data.image,
				title: data.title,
				categories: categoriesKeysToCheck.filter(key => data[key] === true),
				summary: data.summary,
				readyInMinutes: data.readyInMinutes,
				preparationMinutes: data.preparationMinutes || 0,
				cookingMinutes: data.cookingMinutes || 0,
				ingredients,
				instructions,
			};

			return recipe;
		} catch (error) {
			console.error('Error fetching recipe:', error);
			throw error;
		}
	};

	const recipeInfo = await getRecipeById(recipeId);
	// console.log(recipeInfo);

	function ratingToString(rating: number) {
		if (rating === 0) return '☆☆☆☆☆';
		const roundedRating = Math.round(rating);
		const filledStars = '★'.repeat(roundedRating);
		const emptyStars = '☆'.repeat(5 - roundedRating);
		return filledStars + emptyStars;
	}
	const stringifyedRating = ratingToString(3.75);

	return (
		<main className={s.recipePage}>
			<div className={s.recipePage__container}>
				<div className={s.recipe}>
					<div className={s.recipe__img}>
						<Image src={recipeInfo.image} height={350} width={350} alt='recipe-img' />
					</div>

					<div className={s.recipe__mainInfo}>
						<h3 className={s.title}>{recipeInfo.title}</h3>

						<div className={s.row}>
							{recipeInfo.categories.map((category, id) => (
								<Category text={category} key={id} />
							))}
						</div>

						<div className={s.horizontalLine}></div>

						<div className={s.starRating}>
							<span>{stringifyedRating}</span>
							<span>(12)</span>
						</div>

						<div className={s.horizontalLine}></div>

						<div className={s.row}>
							<div className={s.param}>{`Ready in: ${recipeInfo.readyInMinutes}min`}</div>

							{recipeInfo.preparationMinutes > 0 && (
								<div className={s.param}>{`Prep time: ${recipeInfo.preparationMinutes}min`}</div>
							)}

							{recipeInfo.cookingMinutes > 0 && (
								<div className={s.param}>{`Cooking time: ${recipeInfo.cookingMinutes}min`}</div>
							)}
						</div>

						<div className={s.horizontalLine}></div>

						<div className={s.description} dangerouslySetInnerHTML={{ __html: recipeInfo.summary }}></div>
					</div>

					<div className={s.recipe__ingredients}>
						<h3 className={s.title}>Ingredients</h3>
						<ul>
							{recipeInfo.ingredients.map((ingredient, id) => (
								<li key={id}>{ingredient.name}</li>
							))}
						</ul>
					</div>

					<div className={s.recipe__cookProcess}>
						<h3 className={s.title}>Cooking process</h3>

						<p>{recipeInfo.instructions}</p>
					</div>
				</div>

				<div className={s.reviewsContainer}>
					<div className={`${s.reviewsTitle} ${s.row}`}>
						<div className={s.title}>Reviews</div>
						<div className={s.starRating}>
							<span>{stringifyedRating}</span>
							<span>(12)</span>
						</div>
					</div>

					<div className={s.reviewsList}>
						<Review
							avatarSrc='/avatar.png'
							author='Sir Kotelok'
							publishDate='23.01.2024'
							rating={stringifyedRating}
							comment='Came out really good. I seasoned my breast prior to fryingso it was really flavorful. Will definitely try this again.'
						/>
					</div>

					<LeaveReviewForm />
				</div>
			</div>
		</main>
	);
};

export default RecipePage;
