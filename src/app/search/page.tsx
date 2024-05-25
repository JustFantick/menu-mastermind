import React from 'react';
import s from './page.module.scss';
import RecipeCard from '@/components/recipe-card/RecipeCard';
import axios from 'axios';
import LocalSearchbar from './LocalSearchbar';

type SearchPageProps = {
	searchParams: { query?: string };
};

export type Recipe = {
	id: number;
	title: string;
	image: string;
	calories: number;
	servings: number;
	readyInMinutes: number;
};

const SearchPage = async ({ searchParams }: SearchPageProps) => {
	const query = searchParams.query || '';
	let recipesArr: Recipe[] = [];

	const searchRecipes = async (query: string) => {
		try {
			const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
				params: {
					query,
					number: 12,
					apiKey: process.env.SPOONACULAR_API_KEY,
					addRecipeInformation: true,
					addRecipeNutrition: true,
				},
			});

			const recipes = response.data.results.map((recipe: any) => ({
				id: recipe.id,
				title: recipe.title,
				image: recipe.image,
				readyInMinutes: recipe.readyInMinutes,
				servings: recipe.servings,
				calories:
					Math.round(recipe.nutrition?.nutrients.find((nutrient: any) => nutrient.name === 'Calories')?.amount) || 0,
			}));
			return recipes;
		} catch (error) {
			console.error('Error searching for recipes:', error);
			throw error;
		}
	};

	if (query) recipesArr = await searchRecipes(query);

	return (
		<main className={s.searchPage}>
			<div className={s.searchPageContainer}>
				<LocalSearchbar defaultValue={query} />

				<div className={s.cardsContainer}>
					{recipesArr.map(recipe => (
						<RecipeCard
							key={recipe.id}
							href={`recipe/${recipe.id}`}
							title={recipe.title}
							image={recipe.image}
							numberInMinutes={recipe.readyInMinutes}
							calories={recipe.calories}
						/>
					))}
				</div>
			</div>
		</main>
	);
};

export default SearchPage;
