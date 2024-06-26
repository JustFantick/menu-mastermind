import styles from './page.module.scss';
import axios from 'axios';
import HomeSlider from '@/components/home-slider/HomeSlider';
import MainSection from './MainSection';

export type Recipe = {
	id: number;
	image: string;
};

export default async function Home() {
	const getRandomRecipes = async () => {
		try {
			const response = await axios.get('https://api.spoonacular.com/recipes/random', {
				params: {
					number: 5, // Кількість випадкових рецептів
					apiKey: process.env.SPOONACULAR_API_KEY,
				},
			});

			const recipes: Recipe[] = response.data.recipes.map((recipe: any) => ({
				id: recipe.id,
				image: recipe.image.replace('-556x370', '-636x393'), // Зміна розміру зображення
			}));

			return recipes;
		} catch (error) {
			console.error('Error fetching random recipes:', error);
			throw error;
		}
	};

	//const randomRecipes = await getRandomRecipes();
	const randomRecipes = [
		{ id: 1, image: '/slider-img_1.png' },
		{ id: 2, image: '/slider-img_2.png' },
		{ id: 3, image: '/recipe-img.png' },
		{ id: 4, image: '/recipe-img-2.png' },
		{ id: 5, image: '/recipe-img-3.png' },
	];

	return (
		<main className={styles.home}>
			<MainSection />

			<section className={styles.sliderSection}>
				<div className={styles.sliderSection__title}>
					<h2>Culinary Delights</h2>
					<h5>Feast your eyes on dishes from around the world.</h5>
				</div>

				<div className={styles.sliderSection__slider}>
					<HomeSlider recipes={randomRecipes} />
				</div>
			</section>
		</main>
	);
}
