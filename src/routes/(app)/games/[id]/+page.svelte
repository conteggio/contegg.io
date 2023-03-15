<script>
	import { enhance } from '$app/forms';
	import ButtonDelete from '$lib/components/button/ButtonDelete.svelte';
	import ButtonEdit from '$lib/components/button/ButtonEdit.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import List from '$lib/components/list/List.svelte';
	import PortalToRightDrawer from '$lib/components/PortalToRightDrawer.svelte';
	import Portal from 'svelte-portal/src/Portal.svelte';
	import { closeRightDrawer, rightDrawerContent } from '../../../../stores';

	/** @type {import('./$types').PageData} */
	export let data;
	$: ({ game, scores } = data);
</script>

<Heading heading={game.name} headingLevel="h1">
	<ButtonEdit content="edit-game" />
	<ButtonDelete modalID="delete-game-modal" />
</Heading>

<div class="w-full flex flex-col md:flex-row gap-6 justify-between">
	<div class="stat rounded-2xl bg-base-200 text-base-content">
		<div class="stat-title font-">Plays</div>
		<div class="stat-value">{game._count.plays}</div>
	</div>

	<div class="stat rounded-2xl bg-base-200 text-base-content">
		<div class="stat-title">Avg. Score</div>
		<div class="stat-value">{scores.average_score?.toFixed(1) || 'N/A'}</div>
	</div>

	<div class="stat rounded-2xl bg-base-200 text-base-content">
		<div class="stat-title">High Score</div>
		<div class="stat-value">{scores.high_score || 'N/A'}</div>
	</div>
</div>
<h2>Plays</h2>
<List plays={game.plays} />

{#if $rightDrawerContent === 'edit-game'}
	<PortalToRightDrawer>
		<h2 class="font-bold text-2xl">Edit Game</h2>
		<form method="POST" action="?/update" use:enhance class="flex flex-col gap-6 items-start">
			<input type="hidden" name="id" value={game.id} />
			<div class="form-control w-full">
				<label for="name" class="label">
					<span class="label-text">Name</span>
				</label>
				<input type="text" name="name" value={game.name} class="input bg-base-200 w-full" />
			</div>
			<div class="form-control w-full">
				<label for="name" class="label">
					<span class="label-text">Description</span>
				</label>
				<textarea
					name="description"
					value={game.description}
					rows={3}
					class="textarea bg-base-200 w-full"
				/>
			</div>
			<button type="submit" on:click={() => closeRightDrawer()} class="btn btn-primary mt-6"
				>Save</button
			>
		</form>
	</PortalToRightDrawer>
{/if}

<Portal>
	<input type="checkbox" id="delete-game-modal" class="modal-toggle" />
	<div class="modal not-prose">
		<div class="modal-box">
			<h3 class="font-bold text-lg">Are you sure you want to delete {game.name}?</h3>
			<p class="py-4">
				By deleting this game, you will lose all play data. If you would like to keep your play
				data, you may archive this game.
			</p>
			<div class="modal-action">
				<label for="delete-game-modal" class="btn btn-outline">Nevermind</label>
				<form method="POST" action="/games?/delete">
					<input name="id" type="hidden" value={game.id} />
					<button class="btn btn-error">Delete Game</button>
				</form>
			</div>
		</div>
	</div>
</Portal>
