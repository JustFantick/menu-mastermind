'use client';
import React, { useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import Button from '../button/Button';
import s from './review.module.scss';

const LeaveReviewForm = ({ username, recipeId }: { username: string; recipeId: number }) => {
	const [rating, setRating] = useState<number | null>(null);
	const inputRef = useRef<HTMLTextAreaElement>(null);

	const renderStars = () => {
		return [1, 2, 3, 4, 5].map(num => (
			<span key={num} onClick={() => setRating(num)} className={num <= (rating || 0) ? s.starFilled : s.starEmpty}>
				{num <= (rating || 0) ? '★' : '☆'}
			</span>
		));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (inputRef.current?.value !== '' && rating !== null) {
			const response = await fetch('/api/review', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					text: inputRef.current?.value,
					rating: rating,
					username: username,
					recipeId: Math.trunc(recipeId),
				}),
			});

			if (response.ok) {
				setRating(null);
				if (inputRef.current) {
					inputRef.current.value = '';
				}
			} else {
				console.error('Failed to save review');
			}
		}
	};

	return (
		<form className={s.leaveReviewForm} onSubmit={handleSubmit}>
			<div className={s.leaveReviewForm__title}>Leave a review</div>
			<textarea
				ref={inputRef}
				className={s.leaveReviewForm__input}
				name='review'
				placeholder='Type your review here'
			></textarea>

			<div className={s.leaveReviewForm__rating}>
				<p>Rate your experience:</p>
				<div>{renderStars()}</div>
			</div>

			<Button type='submit'>Post review</Button>
		</form>
	);
};

export default LeaveReviewForm;
