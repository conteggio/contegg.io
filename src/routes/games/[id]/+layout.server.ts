import prisma from '$lib/server/prisma';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from '../$types';
export const load = (async ({ params }) => {
	const game = await prisma.game.findUnique({
		where: {
			id: Number(params.id)
		},
		include: {
			plays: true
		}
	});

	if (!game) {
		throw error(404, 'Game not found');
	}

	return {
		game
	};
}) satisfies LayoutServerLoad;
