import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function POST(req: Request, res: Response) {
	try {
		const { username, text, rating, recipeId } = await req.json();
		console.log(recipeId);

		// Виправлення перевірки recipeId
		if (!username || !text || typeof rating !== 'number' || typeof recipeId !== 'number') {
			return NextResponse.json({ error: 'Missing or invalid required fields' }, { status: 400 });
		}

		const user = await prisma.users.findFirst({ where: { username: username } });

		if (!user) {
			return NextResponse.json({ error: 'User not found' }, { status: 404 });
		}

		const review = await prisma.reviews.create({
			data: {
				userId: user.id,
				text: text,
				rating: rating,
				recipeId: recipeId,
			},
		});

		revalidatePath(`/recipe/${recipeId}`);

		return NextResponse.json(review, { status: 201 });
	} catch (error) {
		console.error('Error creating review:', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
