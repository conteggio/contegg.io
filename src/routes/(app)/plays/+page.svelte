<script>
	import { enhance } from '$app/forms';
	import Heading from '$lib/components/Heading.svelte';

	// Components
	import List from '$lib/components/list/List.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	$: ({ plays, games } = data);
</script>

<Heading heading="Plays" headingLevel="h1">
	<form method="POST" action="?/create" use:enhance>
		<div class="form-control max-w-xs">
			<div class="input-group">
				<select
					name="gameId"
					class="select bg-base-200 focus:outline-none focus:bg-base-100 max-w-[12rem]"
				>
					<option hidden selected>Pick a game to play...</option>
					{#each games as game (game.id)}
						<option value={game.id} class="w-full overflow-hidden">{game.name}</option>
					{/each}
				</select>
				<button class="btn btn-primary">Play</button>
			</div>
		</div>
	</form>
</Heading>

<List {plays} />
