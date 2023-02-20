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
							game: {
								select: {
									name: true
								}
							}
						}
					}
				}
			},
			_count: {
				select: {
					plays: true
				}
			}
		}
	});

	if (!player) {
		throw error(404, 'Player not found');
	}

	const wins = await prisma.play.getPlayerWins(Number(params.id));

	const winRates = await prisma.player.getWinRates(Number(params.id));

	return {
		player,
		wins,
		winRates
	};
}) satisfies LayoutServerLoad;
