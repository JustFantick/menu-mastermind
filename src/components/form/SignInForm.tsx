'use client';
import Image from 'next/image';
import React, { useRef } from 'react';
import Input from './Input';
import s from './form.module.scss';

const SignInForm = () => {
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	return (
		<form
			className={s.form}
			onSubmit={e => {
				e.preventDefault();

				console.log(emailRef.current?.value, passwordRef.current?.value);
			}}
		>
			<div className={s.form__title}>Sign in</div>

			<button type='button' onClick={() => console.log('Google')} className={s.googleButton}>
				<Image src={'/google-icon.svg'} height={24} width={24} alt='google-img' />
				<span>Continue with Google</span>
			</button>

			<div className={s.form__dividingLine}>
				<span></span>
				or
				<span></span>
			</div>

			<div className={s.form__fields}>
				<Input
					ref={emailRef}
					type='email'
					name='email'
					label='Email'
					pattern='[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$'
					placeholder='Enter your email'
					isRequired={true}
				/>

				<Input
					ref={passwordRef}
					type='password'
					name='password'
					label='Password'
					placeholder='Create Password'
					pattern='.{6,}'
					isRequired={true}
				/>

				<button type='submit' className={s.formSubmitButton}>
					Log in
				</button>
			</div>
		</form>
	);
};

export default SignInForm;
