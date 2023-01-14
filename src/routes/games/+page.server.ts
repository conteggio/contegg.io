import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';
 
export const load = (async () => {
  return {
    games: await prisma.game.findMany()
  };
}) satisfies PageServerLoad;