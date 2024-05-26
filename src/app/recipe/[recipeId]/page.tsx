import React from 'react';
import s from './page.module.scss';
import Image from 'next/image';
import axios from 'axios';
import Category from '@/components/recipe-card/Category';
import Review from '@/components/review/Review';
import LeaveReviewForm from '@/components/review/LeaveReviewForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';
import FavoriteButton from '@/components/button/FavoriteButton';

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

interface Review {
	id: number;
	userId: number;
	date: Date;
	text: string;
	rating: number;
	recipeId: number;
}

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
	const session = await getServerSession(authOptions);

	const recipeId = params.recipeId;

	const getRecipeById = async (id: number): Promise<Recipe> => {
		try {
			const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
				params: {
					apiKey: process.env.SPOONACULAR_API_KEY,
				},
			});

			const data = response.data;

			const ingredients: Ingredient[] = data.extendedIngredients.map((ingredient: any) => ({
				name: ingredient.originalName,
				amount: ingredient.amount,
				unit: ingredient.unit,
			}));

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

	async function getReviewsFromBD(recipeId: number) {
		const reviews = await prisma.reviews.findMany({
			where: {
				recipeId: recipeId,
			},
			include: {
				user: {
					select: {
						username: true,
					},
				},
			},
		});

		return reviews.map(review => ({
			id: review.id,
			userId: review.userId,
			date: review.date,
			text: review.text,
			rating: review.rating,
			recipeId: review.recipeId,
			username: review.user.username,
		}));
	}

	function ratingToString(rating: number) {
		if (rating === 0) return '☆☆☆☆☆';
		const roundedRating = Math.round(rating);
		const filledStars = '★'.repeat(roundedRating);
		const emptyStars = '☆'.repeat(5 - roundedRating);
		return filledStars + emptyStars;
	}

	const reviews = await getReviewsFromBD(Math.trunc(recipeId));

	function getAverageRating(reviews: Review[]): number {
		if (reviews.length === 0) return 0;

		const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
		const averageRating = totalRating / reviews.length;

		return averageRating;
	}

	let stringifyedRating: string;

	if (reviews.length > 0) {
		const averageRating = getAverageRating(reviews);
		stringifyedRating = ratingToString(averageRating);
	} else {
		stringifyedRating = '☆☆☆☆☆';
	}

	const reviewsNumber = reviews.length;

	function formatDate(dateString: Date) {
		const date = new Date(dateString);
		return new Intl.DateTimeFormat('en-GB', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
		}).format(date);
	}

	let FavoriteButtonBlock = null;

	if (session?.user.username) {
		const user = await prisma.users.findFirst({
			where: { username: session?.user.username },
		});

		const favorite = await prisma.favorites.findFirst({
			where: {
				userId: user?.id,
				recipeId: Math.trunc(recipeId),
			},
		});

		FavoriteButtonBlock = (
			<FavoriteButton recipeId={recipeId} username={session.user.username} defaultIsActive={!!favorite} />
		);
	}

	return (
		<main className={s.recipePage}>
			<div className={s.recipePage__container}>
				<div className={s.recipe}>
					<div className={s.recipe__img}>
						<Image src={recipeInfo.image} height={350} width={350} alt='recipe-img' />
					</div>

					<div className={s.recipe__mainInfo}>
						<div className={s.flexSpaceBetween}>
							<h3 className={s.title}>{recipeInfo.title}</h3>

							{session?.user && FavoriteButtonBlock}
						</div>

						<div className={s.row}>
							{recipeInfo.categories.map((category, id) => (
								<Category text={category} key={id} />
							))}
						</div>

						<div className={s.horizontalLine}></div>

						<div className={s.starRating}>
							<span>{stringifyedRating}</span>
							<span>({reviewsNumber})</span>
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
							<span>({reviewsNumber})</span>
						</div>
					</div>

					<div className={s.reviewsList}>
						{reviews.map(review => (
							<Review
								avatarSrc='/profile.svg'
								author={review.username}
								publishDate={formatDate(review.date)}
								rating={ratingToString(review.rating)}
								comment={review.text}
							/>
						))}
					</div>

					{session?.user && <LeaveReviewForm username={session.user.username} recipeId={recipeId} />}
				</div>
			</div>
		</main>
	);
};

export default RecipePage;
