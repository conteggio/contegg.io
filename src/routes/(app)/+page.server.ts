import type { PageServerLoad } from '../$types';
export const load = (async () => {
	return {
		title: 'Open Source Board Game Tracking and Statistics'
	};
}) satisfies PageServerLoad;
