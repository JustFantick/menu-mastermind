import React from 'react';
import s from './page.module.scss';
import SignUpForm from '@/components/form/SignUpForm';

const SignUpPage = () => {
	return (
		<div className={s.signUp}>
			<SignUpForm />
		</div>
	);
};

export default SignUpPage;
