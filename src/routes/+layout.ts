import type { LayoutLoad } from './$types';
export const load = (async ({ url }) => {
	const pathname = url.pathname;
	return {
		paths: pathname.split('/')
	};
}) satisfies LayoutLoad;
