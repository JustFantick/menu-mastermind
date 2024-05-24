'use client';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import Input from './Input';
import s from './form.module.scss';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const SignInForm = () => {
	const router = useRouter();
	const [showServerErrorMsg, setShowServerErrorMsg] = useState<boolean>(false);
	const [inputsError, setInputsError] = useState<boolean>(false);

	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	return (
		<form
			className={s.form}
			onSubmit={async e => {
				e.preventDefault();
				setInputsError(false);
				console.log(emailRef.current?.value, passwordRef.current?.value);

				try {
					const signInData = await signIn('credentials', {
						email: emailRef.current?.value,
						password: passwordRef.current?.value,
						redirect: false,
					});

					if (signInData?.error) {
						console.log(signInData.error);
						setInputsError(true);
					} else {
						router.push('/');
					}
				} catch (error) {
					setShowServerErrorMsg(true);
				}
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
					pattern='^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$'
					placeholder='Enter your email'
					isRequired={true}
					showError={inputsError}
				/>

				<Input
					ref={passwordRef}
					type='password'
					name='password'
					label='Password'
					placeholder='Create Password'
					pattern='.{6,}'
					isRequired={true}
					showError={inputsError}
				/>

				<button type='submit' className={s.formSubmitButton}>
					Log in
				</button>

				{showServerErrorMsg && <p className={s.serverErrorMsg}>Server error occurred, try again later</p>}
			</div>
		</form>
	);
};

export default SignInForm;
