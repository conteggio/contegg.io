import prisma from '$lib/server/prisma';
import type { LayoutServerLoad } from './$types';
export const load = (async () => {
	return {
		plays: await prisma.play.findMany({
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
			},
			orderBy: {
				createdAt: 'desc'
			}
		}),
		games: await prisma.game.findMany({
			select: {
				id: true,
				name: true
			}
		})
	};
}) satisfies LayoutServerLoad;
