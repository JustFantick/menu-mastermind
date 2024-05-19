import Searchbar from '@/components/searchbar/Searchbar';
import React from 'react';
import s from './page.module.scss';
import RecipeCard from '@/components/recipe-card/RecipeCard';

const SearchPage = () => {
	const defaultCardInfo = {
		href: 'recipe/123',
		title: 'Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs',
		image: '/recipe-img.png',
		time: '1h 5min',
		calories: '300 Calories',
	};

	return (
		<main className={s.searchPage}>
			<div className={s.searchPageContainer}>
				<Searchbar />

				<div className={s.cardsContainer}>
					<RecipeCard
						href={defaultCardInfo.href}
						title={defaultCardInfo.title}
						image={defaultCardInfo.image}
						time={defaultCardInfo.time}
						calories={defaultCardInfo.calories}
					/>
				</div>
			</div>
		</main>
	);
};

export default SearchPage;
