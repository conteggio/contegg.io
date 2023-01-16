import prisma from '$lib/server/prisma';
import type { Player } from '@prisma/client';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from '../$types';
export const load = (async ({ params }) => {
	const player: Player | null = await prisma.player.findUnique({
		where: {
			id: Number(params.id)
		}
	});

	if (!player) {
		throw error(404, 'Player not found');
	}

	return {
		player
	};
}) satisfies LayoutServerLoad;
