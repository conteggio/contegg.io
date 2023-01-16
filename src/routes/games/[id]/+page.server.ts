import prisma from '$lib/server/prisma';
import type { Game } from '@prisma/client';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
export const load = (async ({ params }) => {
	const game: Game | null = await prisma.game.findUnique({
		where: {
			id: Number(params.id)
		}
	});

	if (!game) {
		throw error(404, 'Game not found');
	}

	return {
		game
	};
}) satisfies PageServerLoad;
