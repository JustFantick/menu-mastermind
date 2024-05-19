import Image from 'next/image';
import React from 'react';
import s from './page.module.scss';
import RecipeCardFavorite from '@/components/recipe-card/RecipeCardFavorite';
import Button from '@/components/button/Button';

const ProfilePage = () => {
	return (
		<main className={s.profilePage}>
			<div className={s.profilePage__container}>
				<div className={s.tabs}>
					<a href='#tab1' className={s.tabs__link}>
						<Image src='/profile.svg' height={23} width={23} alt='profile-img' />
						<p>Profile</p>
					</a>
					<a href='#tab2' className={s.tabs__link}>
						<Image src='/favorite.svg' height={23} width={23} alt='favorites-img' />
						<p>Favorites</p>
					</a>
				</div>

				<div className={s.tabContentContainer}>
					<div id='tab1' className={s.tabContentContainer__tab}>
						<div className={s.profileBlock}>
							<h3 className={s.profileBlock__title}>You can edit your profile data here</h3>

							<div className={s.profileBlock__fields}>
								<label className={s.input}>
									<p>Name</p>
									<input type='text' name='name' defaultValue={'SirKotelok'} />
								</label>
								<label className={s.input}>
									<p>Email</p>
									<input type='email' name='name' defaultValue={'kot@gmail.com'} />
								</label>
							</div>

							<a href='#' className={s.changePassword}>
								Change Password
							</a>

							<Button>Log out</Button>
						</div>
					</div>

					<div id='tab2' className={s.tabContentContainer__tab}>
						{/* Your favorites-list is empty */}

						<RecipeCardFavorite
							recipeId='123'
							title='Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs'
							category={['Easy', 'Under 30 mins']}
							time='1h 5min'
							calories='300 Calories'
						/>
					</div>
				</div>
			</div>
		</main>
	);
};

export default ProfilePage;
