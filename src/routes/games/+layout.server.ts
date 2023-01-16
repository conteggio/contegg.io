import prisma from '$lib/server/prisma';
import type { LayoutServerLoad } from './$types';
export const load = (async () => {
	return {
		games: await prisma.game.findMany()
	};
}) satisfies LayoutServerLoad;
