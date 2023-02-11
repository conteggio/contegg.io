import parser from '$lib/universal/fast-xml-parser';
import type { PageLoad } from './$types';
export const load = (async ({ fetch, url }) => {
	const q = url.searchParams.get('q');
	const response = await fetch(
		`https://boardgamegeek.com/xmlapi2/search?query=${q}&type=boardgame`
	);
	const result = await response.text();
	const data = parser.parse(result);
	const results = data.items.item;
	const count = data.items.total;

	return {
		results,
		count,
		q
	};
}) satisfies PageLoad;
