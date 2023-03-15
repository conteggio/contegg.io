import prisma from '$lib/server/prisma';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from '../$types';
export const load = (async ({ params }) => {
	const player = await prisma.player.findUnique({
		where: {
			id: Number(params.id)
		},
		include: {
			_count: {
				select: {
					plays: true
				}
			}
		}
	});

	const plays = await prisma.play.findMany({
		where: {
			players: {
				some: {
					playerId: Number(params.id)
				}
			}
		},
		include: {
			game: true,
			players: {
				include: {
					player: true
				}
			},
			_count: {
				select: {
					players: true
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
		title: player.name,
		player,
		plays,
		wins,
		winRates
	};
}) satisfies LayoutServerLoad;
