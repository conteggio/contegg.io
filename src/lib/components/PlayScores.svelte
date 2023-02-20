<script lang="ts">
	import type { PlayerWithPlace } from '$lib/server/prisma';
	import { formatOrdinals } from '$lib/universal/formatOrdinals';
	import IconTrophy from './icon/IconTrophy.svelte';

	export let players: PlayerWithPlace[];
</script>

<div class="not-prose overflow-x-auto">
	<table class="table w-full">
		<thead>
			<tr>
				<th>Place</th>
				<th>Name</th>
				<th class="text-right pr-7">Score</th>
			</tr>
		</thead>
		<tbody>
			{#each players as player (player.playerId)}
				<tr>
					<td>
						<div class="flex items-center gap-4">
							<span>{formatOrdinals(Number(player.place))}</span>
							{#if player.place == 1}
								<IconTrophy class="w-4 h-4 text-[#D9A441]" />
							{:else if player.place == 2}
								<IconTrophy class="w-4 h-4 text-[#B4B4B4]" />
							{:else if player.place == 3}
								<IconTrophy class="w-4 h-4 text-[#965A38]" />
							{/if}
						</div>
					</td>
					<td>
						<a href={`/players/${player.playerId}`} class="hover:underline">{player.name}</a>
					</td>
					<td>
						<div class="flex justify-end items-center w-full">
							<form method="POST" action="?/updateScore">
								<input type="hidden" name="playId" value={player.playId} />
								<input type="hidden" name="playerId" value={player.playerId} />
								<div class="form-control">
									<label class="input-group input-group-sm group">
										<button
											class="btn btn-square btn-sm opacity-0 group-focus-within:opacity-100"
											type="submit"
											><svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 20 20"
												fill="currentColor"
												class="w-4 h-4"
											>
												<path
													fill-rule="evenodd"
													d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
													clip-rule="evenodd"
												/>
											</svg>
										</button>
										<input
											type="number"
											name="score"
											value={player.score}
											class="input input-sm text-base text-right focus:outline-none focus:bg-base-200 w-20 md:w-32"
										/>
									</label>
								</div>
							</form>
						</div>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	input[type='number'] {
		appearance: textfield;
	}

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
	}
</style>
