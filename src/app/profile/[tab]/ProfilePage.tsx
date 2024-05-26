'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import s from './page.module.scss';
import RecipeCardFavorite from '@/components/recipe-card/RecipeCardFavorite';
import Button from '@/components/button/Button';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

const tabsList = ['profileData', 'favorites'];

const ProfilePage = ({ tab, favorites }: { tab: string; favorites: any[] }) => {
	const router = useRouter();
	const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

	useEffect(() => {
		if (tab === 'favorites') {
			setActiveTabIndex(1);
		} else if (tab === 'profileData') {
			setActiveTabIndex(0);
		}

		console.log(favorites);
	}, [tab]);

	const handleTabClick = (index: number, tabName: string) => {
		setActiveTabIndex(index);
		router.push(`/profile/${tabName}`);
	};

	return (
		<main className={s.profilePage}>
			<div className={s.profilePage__container}>
				<div className={s.tabs}>
					<a
						className={`${s.tabs__link} ${activeTabIndex === 0 ? s.active : ''}`}
						onClick={e => {
							e.preventDefault();
							handleTabClick(0, 'profileData');
						}}
					>
						<Image src='/profile.svg' height={23} width={23} alt='profile-img' />
						<p>Profile</p>
					</a>
					<a
						className={`${s.tabs__link} ${activeTabIndex === 1 ? s.active : ''}`}
						onClick={e => {
							e.preventDefault();
							handleTabClick(1, 'favorites');
						}}
					>
						<Image src='/favorite.svg' height={23} width={23} alt='favorites-img' />
						<p>Favorites</p>
					</a>
				</div>

				<div className={s.tabContentContainer}>
					<div id='tab1' className={`${s.tabContentContainer__tab} ${activeTabIndex === 0 ? s.active : ''}`}>
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

							<Button
							// onClick={() => {
							//   signOut({
							//     redirect: true,
							//     callbackUrl: window.location.origin,
							//   });
							// }}
							>
								Log out
							</Button>
						</div>
					</div>

					<div id='tab2' className={`${s.tabContentContainer__tab} ${activeTabIndex === 1 ? s.active : ''}`}>
						{favorites.length > 0 ? (
							favorites.map(favorite => (
								<RecipeCardFavorite
									key={favorite.id}
									imageUrl={favorite.image}
									recipeId={favorite.id}
									title={favorite.title}
									category={favorite.categories}
									time={`${favorite.readyInMinutes} minutes`}
									calories={`${favorite.calories} Calories`}
								/>
							))
						) : (
							<p>Your favorites-list is empty</p>
						)}
					</div>
				</div>
			</div>
		</main>
	);
};

export default ProfilePage;
