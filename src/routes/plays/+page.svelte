<script lang="ts">
	import CardPlay from '$lib/components/card/CardPlay.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const { plays, games } = data;
</script>

<h1>Plays</h1>
<form method="POST" action="?/create">
	<div class="form-control w-full max-w-xs">
		<div class="input-group">
			<select
				name="gameId"
				class="select bg-base-200 focus:outline-none focus:bg-base-100 max-w-xs"
			>
				<option hidden selected>Pick a game to play...</option>
				{#each games as game (game.id)}
					<option value={game.id} class="w-full overflow-hidden">{game.name}</option>
				{/each}
			</select>
			<button class="btn">Play</button>
		</div>
	</div>
</form>
<div class="not-prose py-6 flex flex-col space-y-6">
	{#each plays as play (play.id)}
		<CardPlay {play} />
	{/each}
</div>
