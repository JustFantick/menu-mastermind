'use client';
import React, { useState } from 'react';
import s from './button.module.scss';
import FavoriteIcon from '../../../public/favorite.svg';

const FavoriteButton = ({
	recipeId,
	username,
	defaultIsActive,
}: {
	recipeId: number;
	username: string;
	defaultIsActive: boolean;
}) => {
	const [isActive, setIsActive] = useState<boolean>(defaultIsActive);

	const handleClick = async () => {
		if (!isActive) {
			try {
				const response = await fetch('/api/favorite', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						recipeId: Math.trunc(recipeId),
						username,
					}),
				});

				if (response.ok) {
					setIsActive(true);
					console.log('Favorite status updated successfully');
				} else {
					console.error('Failed to update favorite status');
				}
			} catch (error) {
				console.error('Error updating favorite status:', error);
			}
		} else {
			try {
				const response = await fetch('/api/favorite', {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						recipeId: Math.trunc(recipeId),
						username,
					}),
				});

				if (response.ok) {
					setIsActive(false);
					console.log('Favorite removed successfully');
				} else {
					console.error('Failed to remove favorite status');
				}
			} catch (error) {
				console.error('Error removing favorite status:', error);
			}
		}
	};

	return <FavoriteIcon className={s.favoriteIcon} data-isactive={isActive} onClick={handleClick} />;
};

export default FavoriteButton;
