<script lang="ts">
	import { page } from '$app/stores';
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
		<a href={`/games/${game.id}`}>
			<div
				class="card card-compact bg-base-200 hover:bg-base-300 hover:-mr-2 transition-all duration-200 ease-in-out"
			>
				<div class="card-body">
					<div>
						<h2 class="card-title line-clamp-1">{game.name}</h2>
						<p>{game.description}</p>
					</div>
				</div>
			</div>
		</a>
	{/each}
</div>

{#if $page.form?.deletedGame}
	<div class="toast">
		<div class="alert alert-success">
			<div>
				<span>${$page.form?.deletedGame.name} has been deleted.</span>
			</div>
		</div>
	</div>
{/if}
