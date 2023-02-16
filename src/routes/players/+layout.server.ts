import prisma from '$lib/server/prisma';
import type { LayoutServerLoad } from './$types';
export const load = (async () => {
	return {
		players: await prisma.player.findMany(),
	};
}) satisfies LayoutServerLoad;
