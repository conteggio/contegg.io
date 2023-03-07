<script>
	import Table from './Table.svelte';

	/**
	 * @typedef {import('@prisma/client').Prisma.PlayerGetPayload<{ include: { _count: { select: { plays: true } } }}>} PlayerExtended
	 * @type {Array<PlayerExtended>} */
	export let players;
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
		{#each players as player (player.id)}
			<tr>
				<td>
					<a href={`/players/${player.id}`} class="font-bold hover:opacity-90 transition-opacity ease-in-out duration-150">{player.name}</a>
				</td>
				<td data-sort={player.createdAt}>
					{player.createdAt.toLocaleDateString()}
				</td>
				<td class="text-right font-mono">
					{player._count.plays}
				</td>
			</tr>
		{/each}
	</tbody>
</Table>
