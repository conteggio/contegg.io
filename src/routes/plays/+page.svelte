<script lang="ts">
	// Components
	import List from '$lib/components/list/List.svelte';

	// Types
	import type { PageData } from './$types';

	export let data: PageData;
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
				{#each data.games as game (game.id)}
					<option value={game.id} class="w-full overflow-hidden">{game.name}</option>
				{/each}
			</select>
			<button class="btn">Play</button>
		</div>
	</div>
</form>
<List plays={data.plays} />
