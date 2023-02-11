import prisma from '$lib/server/prisma';
import type { Play } from '@prisma/client';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
	return {
		players: await prisma.player.findMany()
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	updatePlayers: async ({ request }) => {
		const data = await request.formData();

		// Get playId from form
		const playId = data.get('playId');
		if (!playId) {
			return fail(400, { playId, missing: true });
		}

		// Get existingPlayers from form
		const existingPlayersString = data.get('existingPlayers');
		if (!existingPlayersString) {
			fail(400, { existingPlayersString, missing: true });
		}
		let existingPlayers: number[] = [];
		if (existingPlayersString && existingPlayersString !== '') {
			existingPlayers = existingPlayersString.toString().split(',').map(Number);
		}

		// Get selectedPlayers from form
		const selectedPlayersString = data.get('selectedPlayers');
		if (!selectedPlayersString) {
			fail(400, { selectedPlayersString, missing: true });
		}
		let selectedPlayers: number[] = [];
		if (selectedPlayersString && selectedPlayersString !== '') {
			selectedPlayers = selectedPlayersString.toString().split(',').map(Number);
		}

		// Get playersToDisconnect
		const playersToDisconnect = existingPlayers.filter(
			(playerId: number) => !selectedPlayers.includes(playerId)
		);

		console.log({
			existingPlayers,
			selectedPlayers,
			playersToDisconnect
		});

		// Attempt Prisma transaction only if there is a change to players
		if (selectedPlayers !== existingPlayers) {
			try {
				await prisma.$transaction(async (tx) => {
					// Upsert selectedPlayers
					if (selectedPlayers.length) {
						await tx.play.update({
							where: {
								id: Number(playId)
							},
							data: {
								players: {
									upsert: selectedPlayers.map((playerId: number) => ({
										where: {
											playerId_playId: {
												playId: Number(playId),
												playerId
											}
										},
										create: {
											player: {
												connect: {
													id: playerId
												}
											}
										},
										update: {}
									}))
								}
							}
						});
					}

					if (playersToDisconnect.length) {
						await tx.play.update({
							where: {
								id: Number(playId)
							},
							data: {
								players: {
									delete: playersToDisconnect.map((playerId: number) => ({
										playerId_playId: {
											playId: Number(playId),
											playerId
										}
									}))
								}
							}
						});
					}
				});
			} catch (err) {
				return fail(500, { playId, missing: true });
			}
		}

		return { success: true };
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