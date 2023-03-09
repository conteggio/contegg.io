<script>
	import Portal from 'svelte-portal/src/Portal.svelte';
	import List from '$lib/components/list/List.svelte';
	import { enhance } from '$app/forms';
	import { rightDrawerContent, closeRightDrawer } from '../../../stores';
	import PortalToRightDrawer from '$lib/components/PortalToRightDrawer.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import ButtonEdit from '$lib/components/button/ButtonEdit.svelte';
	import ButtonDelete from '$lib/components/button/ButtonDelete.svelte';

	/** @type {import('./$types').LayoutData} */
	export let data;
	$: ({ player, plays, wins } = data);
</script>

<Heading heading={player.name} headingLevel="h1">
	<ButtonEdit content="edit-player" />
	<ButtonDelete modalID="delete-player-modal" />
</Heading>

<div class="w-full flex flex-col md:flex-row gap-6 justify-between">
	<div class="stat rounded-2xl bg-base-200 text-base-content">
		<div class="stat-title font-">Wins</div>
		<div class="stat-value">{wins}</div>
	</div>

	<div class="stat rounded-2xl bg-base-200 text-base-content">
		<div class="stat-title">Plays</div>
		<div class="stat-value">{player._count.plays}</div>
	</div>

	<div class="stat rounded-2xl bg-base-200 text-base-content">
		<div class="stat-title">Win Rate</div>
		<div class="stat-value">
			{player._count.plays ? ((wins / player._count.plays) * 100).toFixed(0) + '%' : 'N/A'}
		</div>
	</div>
</div>
<h2>Plays</h2>
<List {plays} />

{#if $rightDrawerContent === 'edit-player'}
	<PortalToRightDrawer>
		<h2 class="font-bold text-2xl">Edit {player.name}</h2>
		<form method="POST" action="?/update" use:enhance class="my-4 gap-4">
			<input type="hidden" name="id" value={player.id} />
			<div class="form-control w-full max-w-xs">
				<label for="name" class="label">
					<span class="label-text">Name</span>
				</label>
				<input
					type="text"
					name="name"
					value={player.name}
					class="input bg-base-200 w-full max-w-xs"
				/>
			</div>
			<button on:click={() => closeRightDrawer()} type="submit" class="btn btn-primary mt-6"
				>Save</button
			>
		</form>
	</PortalToRightDrawer>
{/if}

<!-- Teleport modal to body -->
<Portal>
	<input type="checkbox" id="delete-player-modal" class="modal-toggle" />
	<div class="modal not-prose">
		<div class="modal-box">
			<h3 class="font-bold text-lg">Are you sure you want to delete {player.name}?</h3>
			<p class="py-4">By deleting this player, you will lose all of their play data.</p>
			<div class="modal-action">
				<label for="delete-player-modal" class="btn btn-outline">Nevermind</label>
				<form method="POST" action="/players?/delete">
					<input name="id" type="hidden" value={player.id} />
					<button class="btn btn-error">Delete Player</button>
				</form>
			</div>
		</div>
	</div>
</Portal>
