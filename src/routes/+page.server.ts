import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';
export const load = (async () => {
	const playHistory = await prisma.session.findMany({
		where: {
			startedAt: {
				gte: new Date('2020-03-19T14:21:00+0200') /* Includes time offset for UTC */
			}
		}
	});
	return {
		playHistory
	};
}) satisfies PageServerLoad;
