import prisma from '$lib/server/prisma';
import { fail } from '@sveltejs/kit';

/** @type {import("./$types").PageServerLoad} */
export const load = async () => {
	return {
		/** @type {String} - The page title */
		title: 'Setup Phase - Import from Board Game Stats',

		/** @type {Number} - The onboarding progress as a percent */
		progressPercentage: (100 / 3) * 2
	};
};

/** @type {import('./$types').Actions} */
export const actions = {
	bgstats: async ({ request }) => {
		const data = await request.formData();

		const file = /** @type {File | null} */ (data.get('file'));

		if (!file) {
			return fail(400, { file, missing: true });
		}

		const fileContent = /** @type {import('$lib/types').BoardGameStats.FileContent} */ (
			JSON.parse(await file.text())
		);

		/** @type {String} */
		const importedFrom = 'Board Game Stats';

		/** @type {Array<any>} - The Prisma operations to be included in the transaction */
		let inserts = [];

		// Push player inserts
		const players = fileContent.players.map(({ uuid, id, name, bggUsername }) => {
			return {
				name,
				bggUsername,
				importedUuid: uuid,
				importedId: id,
				importedFrom
			};
		});

		players.forEach((data) => {
			inserts.push(
				prisma.player.create({
					data
				})
			);
		});

		// Push location inserts
		const locations = fileContent.locations.map(({ uuid, id, name }) => {
			return {
				name,
				importedUuid: uuid,
				importedId: id,
				importedFrom
			};
		});

		locations.forEach((data) => {
			inserts.push(
				prisma.location.create({
					data
				})
			);
		});

		// Push game inserts
		const games = fileContent.games.map(
			({
				uuid,
				id,
				name,
				cooperative,
				highestWins,
				noPoints,
				usesTeams,
				urlThumb,
				urlImage,
				bggName,
				bggYear,
				bggId,
				metaData,
				rating,
				minPlayerCount,
				maxPlayerCount,
				minPlayTime,
				maxPlayTime,
				minAge
			}) => {
				/** @type {import('@prisma/client').Prisma.GameCreateInput} */
				const data = {
					name,
					ruleIsCooperative: cooperative,
					ruleHighestWins: highestWins,
					ruleHasNoPoints: noPoints,
					ruleDefaultToTeams: usesTeams,
					importedUuid: uuid,
					importedId: id,
					importedFrom
				};
				return data;
			}
		);

		games.forEach((data) => {
			inserts.push(
				prisma.game.create({
					data
				})
			);
		});

		// Push play inserts

		// Perform insertions
		const res = await prisma.$transaction(inserts);

		return res;
	}
};
