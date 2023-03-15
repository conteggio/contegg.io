import type { PageServerLoad } from './$types';
export const load = (async ({ parent }) => {
	const { games } = await parent();
	return {
		games
	};
}) satisfies PageServerLoad;
