import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from './db';
import { compare } from 'bcrypt';

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: 'jwt',
	},
	pages: {
		signIn: '/sign-in',
	},
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'text', placeholder: 'Enter your email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) return null;

				const existingUser = await prisma.users.findUnique({
					where: {
						email: credentials.email,
					},
				});

				if (!existingUser) return null;

				const passwordMatch = await compare(credentials.password, existingUser.password);
				if (!passwordMatch) return null;

				return {
					id: existingUser.id + '', //id value should be a string
					username: existingUser.username,
					email: existingUser.email,
				};
			},
		}),
	],
};
