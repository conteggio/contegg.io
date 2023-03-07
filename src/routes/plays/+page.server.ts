import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';

export const load = (async () => {
	return {
		title: 'Plays | contegg.io'
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	create: async ({ request }) => {
		const data = await request.formData();
		const gameId = data.get('gameId');

		if (!gameId) {
			return fail(400, { gameId, missing: true });
		}

		const newPlay = await prisma.play.create({
			data: {
				gameId: Number(gameId)
			}
		});

		if (newPlay) {
			throw redirect(303, `/plays`);
		}
	},
	delete: async ({ request }) => {
		const data = await request.formData();
		let id = data.get('id');

		if (!id) {
			return fail(400, { id, missing: true });
		}

		const deletedPlay = await prisma.play.delete({
			where: { id: Number(id) }
		});

		if (deletedPlay) {
			throw redirect(303, `/plays`);
		}
	}
};
