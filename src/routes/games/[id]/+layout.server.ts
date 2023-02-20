import prisma from '$lib/server/prisma';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from '../$types';
export const load = (async ({ params }) => {
	const game = await prisma.game.findUnique({
		where: {
			id: Number(params.id)
		},
		include: {
			plays: {
				include: {
					game: true
				}
			},
			_count: {
				select: {
					plays: true
				}
			}
		}
	});

	type Score = {
		average_score: number;
		high_score: number;
	};

	const scoresArr: Score[] = await prisma.$queryRaw`
    SELECT AVG(score) as average_score, MAX(score) as high_score
    FROM PlayerPlay
    WHERE playId IN (
      SELECT id FROM Play WHERE gameId = ${Number(params.id)}
    );

  `;
	const scores = scoresArr[0];

	if (!game) {
		throw error(404, 'Game not found');
	}

	return {
		game,
		scores
	};
}) satisfies LayoutServerLoad;
