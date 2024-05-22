import SignInForm from '@/components/form/SignInForm';
import React from 'react';
import s from './page.module.scss';

const SignInPage = () => {
	return (
		<div className={s.signIn}>
			<SignInForm />
		</div>
	);
};

export default SignInPage;
