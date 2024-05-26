import prisma from '@/lib/db';
import ProfilePage from './ProfilePage';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import axios from 'axios';

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;

export type Recipe = {
	id: number;
	title: string;
	image: string;
	categories: string[];
	calories: number;
	servings: number;
	readyInMinutes: number;
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

const fetchRecipeDetails = async (recipeId: number): Promise<Recipe> => {
	try {
		const response = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information`, {
			params: {
				apiKey: SPOONACULAR_API_KEY,
				includeNutrition: true,
			},
		});

		const recipeData = response.data;
		const recipe: Recipe = {
			id: recipeData.id,
			title: recipeData.title,
			image: recipeData.image,
			categories: categoriesKeysToCheck.filter(key => recipeData[key] === true),
			readyInMinutes: recipeData.readyInMinutes,
			servings: recipeData.servings,
			calories:
				Math.round(recipeData.nutrition?.nutrients.find((nutrient: any) => nutrient.name === 'Calories')?.amount) || 0,
		};
		return recipe;
	} catch (error) {
		console.error('Error fetching recipe details:', error);
		throw error;
	}
};

export default async function Page({ params }: { params: { tab: string } }) {
	const session = await getServerSession();
	const { tab } = params;

	if (!session || !session.user) {
		redirect('/api/auth/signin');
	}

	const user = await prisma.users.findFirst({
		where: { username: session.user.username },
	});

	if (!user) {
		return {
			notFound: true,
		};
	}

	const favorites = await prisma.favorites.findMany({
		where: { userId: user.id },
	});

	const recipeIds = favorites.map(fav => fav.recipeId);

	const recipes = await Promise.all(recipeIds.map(id => fetchRecipeDetails(id)));

	return <ProfilePage tab={tab} favorites={recipes} />;
}
