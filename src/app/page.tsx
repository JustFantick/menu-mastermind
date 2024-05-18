import Searchbar from '@/components/searchbar/Searchbar';
import Image from 'next/image';
import styles from './page.module.scss';
import axios from 'axios';
import HomeSlider from '@/components/home-slider/HomeSlider';

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

	const randomRecipes = await getRandomRecipes();

	console.log(randomRecipes[0]);

	return (
		<main className={styles.home}>
			<section className={styles.home__section}>
				<Image src={'/home-bg_2.png'} alt='home-bg' layout='fill' objectFit='cover' className={styles.sectionBackground} />
				<div className={styles.overlay}></div>

				<Searchbar />
			</section>

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
