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

	const handleClick = () => {
		setIsActive(!isActive);
	};

	return <FavoriteIcon className={s.favoriteIcon} data-isactive={isActive} onClick={handleClick} />;
};

export default FavoriteButton;
