<script>
	// Components
	import CardGame from './card/CardGame.svelte';
	import CardPlay from './card/CardPlay.svelte';
	import CardPlayer from './card/CardPlayer.svelte';
	import ListOptions from './options/ListOptions.svelte';
	import TableViewGames from './table/TableViewGames.svelte';
	import TableViewPlayers from './table/TableViewPlayers.svelte';
	import TableViewPlays from './table/TableViewPlays.svelte';

	// Props
	/** @type {Array<import('$lib/types').GameForTableView>}*/
	export let games = [];

	/** @type {Array<import('$lib/types').PlayForTableView>}*/
	export let plays = [];

	/** @type {Array<import('$lib/types').PlayerForTableView>}*/
	export let players = [];

	/** @type {import('$lib/types').View} - The type of view */
	let view = 'table';
</script>

<ListOptions on:viewChange={(event) => (view = event.detail.view)} />
<div class="not-prose py-6 flex flex-col space-y-6">
	<!-- Table View Components -->
	{#if view === 'table' && games.length}
		<TableViewGames {games} />
	{/if}

	{#if view === 'table' && plays.length}
		<TableViewPlays {plays} />
	{/if}

	{#if view === 'table' && players.length}
		<TableViewPlayers {players} />
	{/if}

	<!-- Card View Components -->
	{#if view === 'cards'}
		<div class="card-grid">
			{#if games.length}
				{#each games as game (game.id)}
					<CardGame {game} />
				{/each}
			{/if}
			{#if plays.length}
				{#each plays as play (play.id)}
					<CardPlay {play} />
				{/each}
			{/if}
			{#if players.length}
				{#each players as player (player.id)}
					<CardPlayer {player} />
				{/each}
			{/if}
		</div>
	{/if}
</div>

<style lang="postcss">
	.card-grid {
		@apply grid auto-rows-auto gap-6;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
	}
</style>
