import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { hash } from 'bcrypt';

export async function POST(req: Request, res: Response) {
	try {
		const body = await req.json();
		const { email, username, password } = body;

		const emailExist = await prisma.users.findUnique({
			where: {
				email: email,
			},
		});
		if (emailExist) {
			return NextResponse.json({
				success: false,
				message: 'Email already exist',
			});
		}

		const usernameExist = await prisma.users.findUnique({
			where: {
				username: username,
			},
		});
		if (usernameExist) {
			return NextResponse.json({
				success: false,
				message: 'Username already exist',
			});
		}

		const hashedPassword = await hash(password, 10);

		const newUser = await prisma.users.create({
			data: {
				username: username,
				email: email,
				password: hashedPassword,
			},
		});

		return NextResponse.json({
			success: true,
			message: 'User created successfully',
		});
	} catch (error) {
		return NextResponse.json({
			success: false,
			message: 'Something went wrong',
		});
	}
}
