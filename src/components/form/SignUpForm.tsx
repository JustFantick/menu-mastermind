'use client';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import Input from './Input';
import s from './form.module.scss';
import { useRouter } from 'next/navigation';

interface InputState {
	label: string;
	showError: boolean;
}

interface InputStates {
	username: InputState;
	email: InputState;
	password: InputState;
}

const SignUpForm = () => {
	const router = useRouter();

	const defaultInputsState = {
		username: { label: 'Nickname', showError: false },
		email: { label: 'Email', showError: false },
		password: { label: 'Password', showError: false },
	};

	const [inputStates, setInputStates] = useState<InputStates>(defaultInputsState);
	const [showServerErrorMsg, setShowServerErrorMsg] = useState<boolean>(false);

	const nameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const handleError = (message: string) => {
		const errorStates: { [key: string]: InputStates } = {
			'Email already exist': {
				...defaultInputsState,
				email: { label: 'This email address is already in use', showError: true },
			},
			'Username already exist': {
				...defaultInputsState,
				username: { label: 'This username is already in use', showError: true },
			},
		};

		setInputStates(errorStates[message] || defaultInputsState);
		if (!errorStates[message]) {
			setShowServerErrorMsg(true);
		}
	};

	return (
		<form
			className={s.form}
			onSubmit={async e => {
				e.preventDefault();
				setShowServerErrorMsg(false);

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

					if (data.success) {
						setInputStates(defaultInputsState);
						router.push('/sign-in');
					} else {
						handleError(data.message);
					}
				} else {
					setInputStates(defaultInputsState);
					setShowServerErrorMsg(true);
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
					pattern='^(?!\s*$).{3,}$'
					placeholder='Enter your nickname'
					isRequired={true}
					label={inputStates.username.label}
					showError={inputStates.username.showError}
				/>

				<Input
					ref={emailRef}
					type='email'
					name='email'
					pattern='^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$'
					placeholder='Enter your email'
					isRequired={true}
					label={inputStates.email.label}
					showError={inputStates.email.showError}
				/>

				<Input
					ref={passwordRef}
					type='password'
					name='password'
					placeholder='Create Password'
					pattern='.{6,}'
					isRequired={true}
					label={inputStates.password.label}
					showError={inputStates.password.showError}
				/>

				<button type='submit' className={s.formSubmitButton}>
					Signup with Email
				</button>

				{showServerErrorMsg && <p className={s.serverErrorMsg}>Server error occurred, try again later</p>}
			</div>
		</form>
	);
};

export default SignUpForm;
