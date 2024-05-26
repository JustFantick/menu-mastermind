import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(req: Request) {
	try {
		const { username, recipeId } = await req.json();

		if (!username || typeof recipeId !== 'number') {
			return NextResponse.json({ error: 'Missing or invalid required fields' }, { status: 400 });
		}

		const user = await prisma.users.findFirst({ where: { username: username } });
		if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

		const favorite = await prisma.favorites.create({
			data: {
				userId: user.id,
				recipeId: recipeId,
			},
		});

		return NextResponse.json(favorite, { status: 201 });
	} catch (error) {
		console.error('Error creating favorite:', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}

export async function GET(req: Request) {
	try {
		const { username, recipeId } = Object.fromEntries(new URL(req.url).searchParams);

		if (!username || typeof parseInt(recipeId) !== 'number') {
			return NextResponse.json({ error: 'Missing or invalid required fields' }, { status: 400 });
		}

		const user = await prisma.users.findFirst({ where: { username: username } });
		if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

		const favorite = await prisma.favorites.findFirst({
			where: {
				userId: user.id,
				recipeId: parseInt(recipeId),
			},
		});

		return NextResponse.json({ isFavorite: !!favorite }, { status: 200 });
	} catch (error) {
		console.error('Error checking favorite:', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}

export async function DELETE(req: Request) {
	try {
		const { username, recipeId } = await req.json();

		if (!username || typeof recipeId !== 'number') {
			return NextResponse.json({ error: 'Missing or invalid required fields' }, { status: 400 });
		}

		const user = await prisma.users.findFirst({ where: { username: username } });
		if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

		const favorite = await prisma.favorites.deleteMany({
			where: {
				userId: user.id,
				recipeId: recipeId,
			},
		});

		return NextResponse.json({ message: 'Favorite removed successfully' }, { status: 200 });
	} catch (error) {
		console.error('Error deleting favorite:', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
