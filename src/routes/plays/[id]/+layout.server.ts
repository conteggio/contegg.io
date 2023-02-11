import prisma from '$lib/server/prisma';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from '../$types';
export const load = (async ({ params }) => {
	const play = await prisma.play.findUnique({
		where: {
			id: Number(params.id)
		},
		include: {
			sessions: true,
			players: {
				include: {
					player: true
				},
				orderBy: {
					score: 'desc'
				}
			}
		}
	});

	if (!play) {
		throw error(404, 'Play not found');
	}

	return {
		play
	};
}) satisfies LayoutServerLoad;
