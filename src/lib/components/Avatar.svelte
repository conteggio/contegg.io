<script>
	/** @type {import('@prisma/client').Player} */
	export let player;

	/** @type {?Boolean} */
	export let clickable = false;

	/**
	 * @param {String} name
	 * @returns {String}
	 */
	function getPlayerInitials(name) {
		const splitName = name.split(' ', 2);
		return splitName.length === 1 ? splitName[0][0] : splitName[0][0] + splitName[1][0];
	}
</script>

{#if clickable}
	<a href={`/players/${player.id}`} class="avatar placeholder">
		<div
			class="bg-base-300 hover:bg-base-200 transition-colors ease-in-out duration-150 text-base-content rounded-full w-12"
		>
			<span class="uppercase">{getPlayerInitials(player.name)}</span>
		</div>
	</a>
{:else}
	<div class="avatar placeholder">
		<div class="bg-base-300 text-base-content rounded-full w-12">
			<span class="uppercase">{getPlayerInitials(player.name)}</span>
		</div>
	</div>
{/if}
