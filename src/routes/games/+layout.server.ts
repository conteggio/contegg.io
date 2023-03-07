import prisma from '$lib/server/prisma';
import type { LayoutServerLoad } from './$types';
export const load = (async ({ url }) => {
	const { search, searchParams } = url;

	let where: any;

	if (search !== '') {
		where = {
			AND: []
		};

		searchParams.forEach((value: string | Date, key) => {
			const splitKey = key.split('.');
			key = splitKey[0];
			const comparator = splitKey[1] || 'eq';

			if (key === 'createdAt') {
				value = new Date(value);
			}

			where.AND.push({
				[key]: {
					[comparator]: value
				}
			});
		});
	}

	return {
		games: await prisma.game.findMany({
			where,
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
