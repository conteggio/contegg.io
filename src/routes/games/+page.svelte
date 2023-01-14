<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const { games } = data;
</script>

<h1>Games</h1>
{#each games as game}
	<h2>{game.name}</h2>
	<p>{game.description}</p>
{/each}
