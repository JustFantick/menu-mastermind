'use client';
import Image from 'next/image';
import React, { useRef } from 'react';
import Input from './Input';
import s from './form.module.scss';
import { clear } from 'console';

const SignUpForm = () => {
	const nameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	return (
		<form
			className={s.form}
			onSubmit={async e => {
				e.preventDefault();

				console.log(nameRef.current?.value, emailRef.current?.value, passwordRef.current?.value);
				const response = await fetch('/api/user/', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						username: nameRef.current?.value,
						email: emailRef.current?.value,
						password: passwordRef.current?.value,
					}),
				});

				if (response.ok) {
					const data = await response.json();
					console.log(data);
				} else {
					console.log('failed');
				}
			}}
		>
			<div className={s.form__title}>Sign up</div>

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
					ref={nameRef}
					type='text'
					name='text'
					label='Nickname'
					pattern='^(?!\s*$).{3,}$'
					placeholder='Enter your name'
					isRequired={true}
				/>

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
					Signup with Email
				</button>
			</div>
		</form>
	);
};

export default SignUpForm;
