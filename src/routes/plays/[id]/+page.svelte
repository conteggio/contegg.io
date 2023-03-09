<script>
	import { enhance } from '$app/forms';
	import ButtonDelete from '$lib/components/button/ButtonDelete.svelte';
	import ButtonEdit from '$lib/components/button/ButtonEdit.svelte';
	import ChartBar from '$lib/components/chart/ChartBar.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import PortalToRightDrawer from '$lib/components/PortalToRightDrawer.svelte';
	import Portal from 'svelte-portal/src/Portal.svelte';
	import { closeRightDrawer, rightDrawerContent } from '../../../stores';

	/** @type {import('./$types').PageData} */
	export let data;
	$: ({ play, players, allPlayers } = data);

	$: existingPlayers = players.map((player) => player.playerId);
	$: selectedPlayers = existingPlayers;
</script>

<Heading
	heading={play.game.name}
	headingLevel="h1"
	additionalText={`on ${play.createdAt.toLocaleDateString()}`}
>
	<ButtonEdit content="edit-play" />
	<ButtonDelete modalID="delete-play-modal" />
</Heading>

<h2 class="!mt-0">Scores</h2>

{#if players.length}
	<ChartBar
		data={{
			labels: players.map(({ name }) => name),
			datasets: [
				{
					label: 'Score',
					data: players.map(({ score }) => score),
					backgroundColor: '#f99155'
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

{#if $rightDrawerContent === 'edit-play'}
	<PortalToRightDrawer>
		<h2 class="font-bold text-2xl">Edit Play</h2>
		<form method="POST" action="?/update" use:enhance class="mt-6 flex flex-col gap-6 items-start">
			<input type="hidden" name="id" value={play.id} />

			<div class="form-control w-full">
				<label for="name" class="label">
					<span class="label-text">Date</span>
				</label>
				<input type="date" name="playedAt" value={play.playedAt || play.createdAt} class="input" />
			</div>

			<div class="form-control w-full">
				<label for="name" class="label">
					<span class="label-text">Location</span>
				</label>
				<input type="text" name="location" class="input" />
			</div>

			<div class="form-control w-full">
				<label for="name" class="label">
					<span class="label-text">Duration</span>
				</label>
				<input type="text" name="location" class="input" />
			</div>

			<button type="submit" on:click={() => closeRightDrawer()} class="btn btn-primary mt-6"
				>Save</button
			>
		</form>
	</PortalToRightDrawer>
{/if}

<Portal>
	<!-- Delete Play Modal -->
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

	<!-- Edit Players Modal -->
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
</Portal>
