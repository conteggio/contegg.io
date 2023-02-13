<script lang="ts">
	import type { LayoutData, PageData } from './$types';

	export let data: PageData | LayoutData;
	const { play, players, scoreboard } = data;

	const existingPlayers = play.players.map(({ playerId }) => playerId);
	let selectedPlayers: number[] = existingPlayers;
</script>

{#each scoreboard as board (board.playerId)}
	<p>{board.score_rank}</p>
{/each}

<div class="w-full flex flex-row justify-between">
	<h1>Play</h1>
	<div class="flex space-x-2">
		<label for="delete-play-modal" class="btn btn-ghost btn-square">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				class="w-6 h-6"
			>
				<path
					fill-rule="evenodd"
					d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
					clip-rule="evenodd"
				/>
			</svg>
		</label>
	</div>
</div>

<h2>Scoreboard</h2>
<div class="not-prose overflow-x-auto">
	{#if play.players.length}
		<table class="table w-full">
			<!-- head -->
			<thead>
				<tr>
					<th />
					<th>Name</th>
					<th>Score</th>
				</tr>
			</thead>
			<tbody>
				{#each play.players as player (player.playerId)}
					<tr>
						<th>1</th>
						<td>
							<div class="flex items-center gap-2">
								{player.player.name}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="#ffdb58"
									class="w-4 h-4"
								>
									<path
										fill-rule="evenodd"
										d="M10 1c-1.828 0-3.623.149-5.371.435a.75.75 0 00-.629.74v.387c-.827.157-1.642.345-2.445.564a.75.75 0 00-.552.698 5 5 0 004.503 5.152 6 6 0 002.946 1.822A6.451 6.451 0 017.768 13H7.5A1.5 1.5 0 006 14.5V17h-.75C4.56 17 4 17.56 4 18.25c0 .414.336.75.75.75h10.5a.75.75 0 00.75-.75c0-.69-.56-1.25-1.25-1.25H14v-2.5a1.5 1.5 0 00-1.5-1.5h-.268a6.453 6.453 0 01-.684-2.202 6 6 0 002.946-1.822 5 5 0 004.503-5.152.75.75 0 00-.552-.698A31.804 31.804 0 0016 2.562v-.387a.75.75 0 00-.629-.74A33.227 33.227 0 0010 1zM2.525 4.422C3.012 4.3 3.504 4.19 4 4.09V5c0 .74.134 1.448.38 2.103a3.503 3.503 0 01-1.855-2.68zm14.95 0a3.503 3.503 0 01-1.854 2.68C15.866 6.449 16 5.74 16 5v-.91c.496.099.988.21 1.475.332z"
										clip-rule="evenodd"
									/>
								</svg>
							</div></td
						>
						<td>
							<form method="POST" action="?/updateScore">
								<input type="hidden" name="playId" value={player.playId} />
								<input type="hidden" name="playerId" value={player.playerId} />
								<div class="form-control">
									<div class="input-group">
										<input type="number" name="score" value={player.score} class="input" />
										<button type="submit" class="btn btn-square">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												fill="currentColor"
												class="w-6 h-6"
											>
												<path
													fill-rule="evenodd"
													d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
													clip-rule="evenodd"
												/>
											</svg>
										</button>
									</div>
								</div>
							</form>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{:else}
		<p>Add one or more players to start keeping score.</p>
	{/if}
</div>
<label for="manage-players-modal" class="btn btn-primary mt-6">Manage Players</label>

<h2>Sessions</h2>

<input type="checkbox" id="delete-play-modal" class="modal-toggle" />
<div class="modal not-prose">
	<div class="modal-box">
		<h3 class="font-bold text-lg">Are you sure you want to delete this play?</h3>
		<p class="py-4">By deleting this play, you will lose all play data and sessions.</p>
		<div class="modal-action">
			<label for="delete-play-modal" class="btn btn-outline">Nevermind</label>
			<form method="POST" action="/plays?/delete">
				<input name="id" type="hidden" value={play.id} />
				<button class="btn btn-error">Delete Play</button>
			</form>
		</div>
	</div>
</div>

<input type="checkbox" id="manage-players-modal" class="modal-toggle" />
<div class="modal not-prose">
	<div class="modal-box">
		<form method="POST" action="?/updatePlayers">
			<h3 class="font-bold text-lg">Select Players</h3>
			<div class="flex flex-col gap-2 mt-4">
				{#each players as { name, id } (id)}
					<label for={id} class="hover:cursor-pointer">
						<div
							class="card card-compact bg-base-200 hover:bg-base-300 transition-color duration-200 ease-in-out"
						>
							<div class="card-body !py-3">
								<div class="flex justify-between items-center">
									<h2 class="card-title line-clamp-1">{name}</h2>
									<input
										type="checkbox"
										bind:group={selectedPlayers}
										{id}
										value={id}
										checked={play.players.some((player) => player.playerId === id)}
										class="checkbox checked:checkbox-success"
									/>
								</div>
							</div>
						</div>
					</label>
				{/each}
			</div>
			<input type="hidden" name="existingPlayers" value={existingPlayers} />
			<input type="hidden" name="selectedPlayers" value={selectedPlayers} />
			<input type="hidden" name="playId" value={play.id} />
			<div class="modal-action">
				<label for="manage-players-modal" class="btn btn-outline">Nevermind</label>
				<button type="submit" class="btn btn-success">Save Changes</button>
			</div>
		</form>
	</div>
</div>
