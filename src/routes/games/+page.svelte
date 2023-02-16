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
				class="card card-side card-compact bg-base-200 hover:bg-base-100 transition-color duration-200 ease-in-out overflow-hidden"
			>
				{#if game.bggThumbnail}
					<div class="aspect-[6/4] h-[84px]">
						<img src={game.bggThumbnail} class="object-cover w-full h-full" alt="" srcset="" />
					</div>
				{/if}
				<div class="card-body h-auto w-full flex-grow">
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
