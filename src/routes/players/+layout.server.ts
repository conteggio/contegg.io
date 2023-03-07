import prisma from '$lib/server/prisma';
import type { LayoutServerLoad } from './$types';
export const load = (async () => {
	return {
		players: await prisma.player.findMany({
			include: {
				_count: {
					select: {
						plays: true
					}
				}
			}
		})
	};
}) satisfies LayoutServerLoad;
