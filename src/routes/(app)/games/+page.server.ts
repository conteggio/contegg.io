import parser from '$lib/universal/fast-xml-parser';
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';

export const actions: Actions = {
	create: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name')?.toString();
		const description = data.get('description')?.toString();
		const bggId = data.get('bggId')?.toString();

		if (!name) {
			return fail(400, { name, missing: true });
		}

		const bggRes = await fetch(`https://boardgamegeek.com/xmlapi2/thing?parameters&id=${bggId}`);
		const result = await bggRes.text();
		const bggData = parser.parse(result);
		const bggThumbnail: string | undefined = bggData.items.item.thumbnail;

		const newGame = await prisma.game.create({
			data: {
				name,
				description,
				bggId,
				bggThumbnail
			}
		});

		if (newGame) {
			throw redirect(303, `/games/${newGame.id}`);
		}
	},
	delete: async ({ request }) => {
		const data = await request.formData();
		let id = data.get('id');

		if (!id) {
			return fail(400, { id, missing: true });
		}

		const deletedGame = await prisma.game.delete({
			where: { id: Number(id) }
		});

		if (deletedGame) {
			throw redirect(303, `/games`);
		}

		return { deletedGame };
	},
	search: async ({ request }) => {
		const form = await request.formData();
		const query = form.get('search')?.toString();

		if (!query) {
			return fail(400, { query, missing: true });
		}

		const response = await fetch(
			`https://boardgamegeek.com/xmlapi2/search?query=${query}&type=boardgame`
		);
		const result = await response.text();
		const data = parser.parse(result);
		return {
			data
		};
	}
};
