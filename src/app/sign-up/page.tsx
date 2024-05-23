import React from 'react';
import s from './page.module.scss';
import SignUpForm from '@/components/form/SignUpForm';
import prisma from '@/lib/db';

const SignUpPage = async () => {
	const users = await prisma.users.findMany();
	console.log(users);

	return (
		<div className={s.signUp}>
			<SignUpForm />
		</div>
	);
};

export default SignUpPage;
