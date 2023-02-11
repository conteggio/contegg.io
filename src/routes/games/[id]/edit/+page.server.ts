import prisma from '$lib/server/prisma';
import type { Game } from '@prisma/client';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	update: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');
		const name = data.get('name')?.toString().trim();
		const description = data.get('description')?.toString().trim();

		if (!name) {
			return fail(400, { name, missing: true });
		}

		const updatedGame: Game = await prisma.game.update({
			where: {
				id: Number(id)
			},
			data: {
				name,
				description
			}
		});

		if (updatedGame) {
			throw redirect(303, `/games/${id}`);
		}

		return {
			updatedGame
		};
	}
};
