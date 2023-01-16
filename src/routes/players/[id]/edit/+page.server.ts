import prisma from '$lib/server/prisma';
import type { Player } from '@prisma/client';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	update: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');
		const name = data.get('name')?.toString();

		if (!name) {
			return fail(400, { name, missing: true });
		}

		const updatedPlayer: Player = await prisma.player.update({
			where: {
				id: Number(id)
			},
			data: {
				name
			}
		});

		if (updatedPlayer) {
			throw redirect(303, `/players/${id}`);
		}

		return {
			updatedPlayer
		};
	}
};
