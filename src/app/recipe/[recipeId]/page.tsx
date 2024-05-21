import React from 'react';
import s from './page.module.scss';
import Image from 'next/image';
import Param from '@/components/recipe-card/Param';
import Category from '@/components/recipe-card/Category';
import Review from '@/components/review/Review';
import LeaveReviewForm from '@/components/review/LeaveReviewForm';

const RecipePage = ({ params }: { params: { recipeId: number } }) => {
	//Req on recipeId

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
						<Image src={'/recipe-img.png'} height={350} width={350} alt='recipe-img' />
					</div>

					<div className={s.recipe__mainInfo}>
						<h3 className={s.title}>Super leek & potato soup</h3>

						<div className={s.row}>
							<Category text='Easy' />
							<Category text='Under 30 mins' />
						</div>

						<div className={s.horizontalLine}></div>

						<div className={s.starRating}>
							<span>{stringifyedRating}</span>
							<span>(12)</span>
						</div>

						<div className={s.horizontalLine}></div>

						<div className={s.row}>
							<div className={s.param}>Total time: 1hour</div>
							<div className={s.param}>Prep time: 40min</div>
							<div className={s.param}>Cook time: 20min</div>
						</div>

						<div className={s.horizontalLine}></div>

						<div className={s.description}>
							I’ve taken family favourite leek and potato soup to the next level here by adding lots of lovely leafy kale,
							which – along with leeks – gives us vitamin B6, helping us stay awake and alert.
						</div>
					</div>

					<div className={s.recipe__ingredients}>
						<h3 className={s.title}>Ingredients</h3>
						<ul>
							<li>400g leeks</li>
							<li>olive oil</li>
							<li>400 g potatoes</li>
							<li>1.5 litres organic veg , or chicken stock</li>
							<li>320g kale</li>
							<li>½ a bunch of fresh mint , (15g)</li>
							<li>½ a bunch of fresh flat-leaf parsley , (15g)</li>
							<li>40 g Parmesan cheese</li>
						</ul>
					</div>

					<div className={s.recipe__cookProcess}>
						<h3 className={s.title}>Cooking process</h3>

						<p>
							Trim and wash 400g of leeks, then slice and place in a large casserole pan on a medium heat with 1 tablespoon of
							olive oil.
						</p>
						<p>
							Sweat for 10 minutes, stirring regularly, while you wash and finely slice 400g of potatoes (leaving the skin on
							for extra nutritional benefit), then stir into the pan.
						</p>
						<p>
							Pour in 1.5 litres of vegetable or chicken stock and boil hard for 15 minutes. Pick through 320g of kale,
							discarding any tough stalks, and add to the pan for the last 5 minutes, pushing it down and covering with a lid.
						</p>
						<p>
							In batches, carefully pour the contents of the pan into a blender. Put the lid on securely, cover with a tea
							towel and, holding it in place, blitz until super- smooth.
						</p>
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
