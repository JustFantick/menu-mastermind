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
	preparationMinutes: number;
	cookingMinutes: number;
};

const SearchPage = async ({ searchParams }: SearchPageProps) => {
	const query = searchParams.query || '';
	let recipesArr: Recipe[] = [];

	const searchRecipes = async (query: string) => {
		try {
			const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
				params: {
					query,
					number: 2,
					apiKey: process.env.SPOONACULAR_API_KEY,
					addRecipeInformation: true,
					addRecipeNutrition: true, // Доданий параметр для отримання інформації про харчування
				},
			});

			console.log(response.data.results[0]);

			const recipes = response.data.results.map((recipe: any) => ({
				id: recipe.id,
				title: recipe.title,
				image: recipe.image,
				readyInMinutes: recipe.readyInMinutes,
				preparationMinutes: recipe.preparationMinutes,
				cookingMinutes: recipe.cookingMinutes,
				servings: recipe.servings,
				calories: recipe.nutrition?.nutrients.find((nutrient: any) => nutrient.name === 'Calories')?.amount || 0,
			}));

			console.log(recipes);

			return recipes;
		} catch (error) {
			console.error('Error searching for recipes:', error);
			throw error;
		}
	};

	if (query) {
		recipesArr = await searchRecipes(query);
		//console.log(recipesArr);
	}

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
							servings={recipe.servings}
						/>
					))}
				</div>
			</div>
		</main>
	);
};

export default SearchPage;
