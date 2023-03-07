<script>
	import IconTrophy from './icon/IconTrophy.svelte';

	/** @type {import('@prisma/client').Prisma.PlayerPlayGetPayload<{ include: { player: true }}>} */
	export let playerPlay;

	/**
	 * @param {String} name
	 * @returns {String}
	 */
	function getPlayerInitials(name) {
		const splitName = name.split(' ', 2);
		return splitName.length === 1 ? splitName[0][0] : splitName[0][0] + splitName[1][0];
	}
</script>

<div class="relative">
	<a href={`/players/${playerPlay.playerId}`} class="avatar placeholder">
		<div
			class="bg-base-300 hover:bg-base-200 transition-colors ease-in-out duration-150 text-base-content rounded-full w-12"
		>
			<span class="uppercase">{getPlayerInitials(playerPlay.player.name)}</span>
		</div>
	</a>
	<!-- TODO: Uncomment once wins are implemented into PlayerPlays -->
	<!-- <div class="absolute top-0.5 left-0"><IconTrophy class="w-4 h-4" /></div> -->
</div>
