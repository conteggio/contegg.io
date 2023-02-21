import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';

export const load = (async () => {
	return {
		players: await prisma.player.findMany()
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	create: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name')?.toString();

		if (!name) {
			return fail(400, { name, missing: true });
		}

		const newPlayer = await prisma.player.create({
			data: {
				name
			}
		});

		return {
			newPlayer
		};
	},
	delete: async ({ request }) => {
		const data = await request.formData();
		let id = data.get('id');

		if (!id) {
			return fail(400, { id, missing: true });
		}

		const deletedPlayer = await prisma.player.delete({
			where: { id: Number(id) }
		});

		if (deletedPlayer) {
			throw redirect(303, `/players`);
		}

		return { deletedPlayer };
	}
};
