import Image from 'next/image';
import React from 'react';
import s from './review.module.scss';

interface ReviewProps {
	avatarSrc: string;
	author: string;
	publishDate: string;
	rating: string;
	comment: string;
}

const Review = ({ avatarSrc, author, publishDate, rating, comment }: ReviewProps) => {
	return (
		<div className={s.review}>
			<div className={s.review__img}>
				<Image src={avatarSrc} height={30} width={30} alt='avatar' />
			</div>
			<div className={s.review__title}>
				<h6>{author}</h6>
				<p>{publishDate}</p>
			</div>

			<div className={s.review__starRating}>{rating}</div>

			<div className={s.review__comment}>{comment}</div>
		</div>
	);
};

export default Review;
