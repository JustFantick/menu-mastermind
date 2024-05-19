import React from 'react';
import s from './recipeCard.module.scss';
import Image from 'next/image';

const Param = ({ imgSrc, text }: { imgSrc: string; text: string }) => {
	return (
		<div className={s.param}>
			<Image src={imgSrc} height={20} width={20} alt={`${imgSrc}-img`} />
			<p>{text}</p>
		</div>
	);
};

export default Param;
