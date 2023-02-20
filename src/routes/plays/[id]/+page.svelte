<script lang="ts">
	import ChartBar from '$lib/components/chart/ChartBar.svelte';
	import PlayScores from '$lib/components/PlayScores.svelte';
	import type { PlayerWithPlace } from '$lib/server/prisma';
	import type { LayoutData, PageData } from './$types';

	export let data: PageData | LayoutData;
	const { play, players, allPlayers } = data;

	const existingPlayers = players.map((player: PlayerWithPlace) => player.playerId);
	let selectedPlayers: number[] = existingPlayers;
</script>

<div class="w-full flex flex-row justify-between gap-6">
	<h1 class="line-clamp-1">{play.game.name}</h1>
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

<h2 class="!mt-0">Scores</h2>

{#if players.length}
	<ChartBar
		data={{
			labels: players.map(({ name }) => name),
			datasets: [
				{
					label: 'Score',
					data: players.map(({ score }) => score),
					backgroundColor: '#1FB2A5'
				}
			]
		}}
		options={{
			indexAxis: 'y',
			scales: {
				y: {
					beginAtZero: true
				}
			}
		}}
	/>
{:else}
	<p>Add one or more players to start keeping score.</p>
{/if}
<label for="manage-players-modal" class="btn mt-6" class:btn-outline={players.length}
	>Manage Players</label
>

<h2>Sessions</h2>
{#each play.sessions as session (session.id)}
	<p>{session.startedAt}</p>
{/each}
<form method="POST" action="?/createSession">
	<button type="submit" class="btn mt-6" class:btn-outline={players.length}>Add Session</button>
</form>

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
		<h3 class="font-bold text-lg mb-6">Select Players</h3>
		<form method="POST" action="?/updatePlayers">
			<div class="flex flex-col gap-2 mt-4 overflow-y-auto max-h-[50vh]">
				{#each allPlayers as { name, id } (id)}
					<label for={id} class="hover:cursor-pointer active:scale-[0.99]">
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
										checked={players.some((player) => player.playerId === id)}
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
