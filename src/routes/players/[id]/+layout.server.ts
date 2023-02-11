import prisma from '$lib/server/prisma';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from '../$types';
export const load = (async ({ params }) => {
	const player = await prisma.player.findUnique({
		where: {
			id: Number(params.id)
		},
		include: {
			plays: {
				include: {
					play: {
						include: {
							game: true
						}
					}
				}
			}
		}
	});

	if (!player) {
		throw error(404, 'Player not found');
	}

	return {
		player
	};
}) satisfies LayoutServerLoad;
