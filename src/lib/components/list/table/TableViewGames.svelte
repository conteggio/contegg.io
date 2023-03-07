<script>
	import Table from './Table.svelte';

	/** @type {Array<import('$lib/types').GameForTableView>} */
	export let games;
</script>

<Table>
	<thead slot="head">
		<tr>
			<th>Name</th>
			<th>Date Added</th>
			<th class="text-right">Plays</th>
		</tr>
	</thead>
	<tbody slot="body">
		{#each games as game (game.id)}
			<tr>
				<td class="max-w-xs">
					<a href={`/games/${game.id}`}
						><div
							class="font-bold hover:opacity-90 transition-opacity ease-in-out duration-150 truncate"
						>
							{game.name}
						</div></a
					>
				</td>
				<td data-sort={game.createdAt}>
					{game.createdAt.toLocaleDateString()}
				</td>
				<td class="text-right font-mono">
					{game._count.plays}
				</td>
			</tr>
		{/each}
	</tbody>
</Table>
