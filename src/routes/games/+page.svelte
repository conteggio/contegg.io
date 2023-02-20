<script lang="ts">
	import { page } from '$app/stores';
	import CardGame from '$lib/components/card/CardGame.svelte';
	import GameSearch from '$lib/components/GameSearch.svelte';
	import type { PageData, ActionData } from './$types';

	export let data: PageData;
	export let form: ActionData;
	const { games } = data;
</script>

<h1>Games</h1>
<GameSearch />
<div class="not-prose py-6 flex flex-col space-y-6">
	{#each games as game (game.id)}
		<CardGame {game} />
	{/each}
</div>
