import prisma from '$lib/server/prisma';
import type { Actions } from './$types';

export const actions: Actions = {
	update: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');
		const name = data.get('name')?.toString();

		try {
			await prisma.player.update({
				where: {
					id: Number(id)
				},
				data: {
					name
				}
			});
		} catch (error) {
			console.error(error);
		}
	}
};
