'use client';
import React, { useRef } from 'react';
import Button from '../button/Button';
import s from './review.module.scss';

const LeaveReviewForm = () => {
	const inputRef = useRef<HTMLTextAreaElement>(null);
	return (
		<form
			className={s.leaveReviewForm}
			onSubmit={e => {
				e.preventDefault();

				if (inputRef.current?.value !== '') {
					console.log('helo');
				}
			}}
		>
			<div className={s.leaveReviewForm__title}>Leave a Review</div>
			<textarea
				ref={inputRef}
				className={s.leaveReviewForm__input}
				name='review'
				placeholder='Type your review here'
			></textarea>

			<Button type='submit'>Post review</Button>
		</form>
	);
};

export default LeaveReviewForm;
