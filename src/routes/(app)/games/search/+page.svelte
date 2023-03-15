<script>
	import GameSearch from '$lib/components/GameSearch.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
	const { games, results, count, q } = data;

	/**
	 * @param {String} bggId
	 * @returns {Boolean}
	 */
	function isInCollection(bggId) {
		return games.find((game) => game.bggId == bggId) ? true : false;
	}
</script>

<div class="indicator">
	<span class="indicator-item badge badge-primary font-bold">{count}</span>
	<h1>Search Results</h1>
</div>
<GameSearch value={q} />
{#if results}
	<div class="not-prose flex flex-col py-6 space-y-6">
		{#each results as game (game.id)}
			<div class="card card-compact bg-base-200">
				<div class="card-body flex-row justify-between items-center">
					<div>
						<h2 class="card-title line-clamp-1">{@html game.name?.value || '?'}</h2>
						<p class="italic">{game.yearpublished?.value || 'Unknown Year'}</p>
					</div>
					<div class="card-actions justify-end">
						{#if isInCollection(game.id)}
							<div class="btn btn-sm btn-square btn-success no-animation cursor-default">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									class="w-6 h-6"
								>
									<path
										fill-rule="evenodd"
										d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
										clip-rule="evenodd"
									/>
								</svg>
							</div>
						{:else}
							<form method="POST" action="/games?/create">
								<input class="hidden" name="name" type="hidden" value={game.name.value} />
								<input class="hidden" name="bggId" type="hidden" value={game.id} />
								<button class="btn btn-sm btn-square btn-outline">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										class="w-6 h-6"
									>
										<path
											fill-rule="evenodd"
											d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
											clip-rule="evenodd"
										/>
									</svg>
								</button>
							</form>
						{/if}
					</div>
				</div>
			</div>
		{/each}
	</div>
{/if}
