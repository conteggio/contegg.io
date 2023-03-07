<script>
	import Avatar from '$lib/components/Avatar.svelte';
	import Table from './Table.svelte';

	/** @type {Array<import('$lib/types').PlayForTableView>} */
	export let plays;
</script>

<Table>
	<thead slot="head">
		<tr>
			<th>Play</th>
			<th>Players</th>
		</tr>
	</thead>
	<tbody slot="body">
		{#each plays as play (play.id)}
			<tr>
				<td data-sort={play.game.name} class="max-w-xs">
					<a
						href={`/plays/${play.id}`}
						class="hover:opacity-90 transition-opacity ease-in-out duration-150"
					>
						<div class="flex flex-col leading-snug">
							<span class="font-bold truncate">{play.game.name}</span>
							<span class="italic">on {play.createdAt.toLocaleDateString()}</span>
						</div></a
					>
				</td>
				<td data-sort={play._count.players}>
					<div class="avatar-group -space-x-6">
						{#each play.players as playerPlay, i (playerPlay.playerId)}
							{#if i < 4}
								<Avatar player={playerPlay.player} clickable />
							{:else if i === 4}
								<div class="avatar placeholder">
									<div class="w-12 bg-neutral-focus text-neutral-content">
										<span>+{play.players.length - 4}</span>
									</div>
								</div>
							{/if}
						{/each}
					</div>
				</td>
			</tr>
		{/each}
	</tbody>
</Table>
