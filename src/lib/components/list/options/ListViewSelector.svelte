<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import IconCards from '$lib/components/icon/IconCards.svelte';
	import IconTable from '$lib/components/icon/IconTable.svelte';

	/** @type {import('$lib/types').View} */
	let view = 'table';

	const dispatch = createEventDispatcher();

	/**
	 * This function sets the new view type and forwards the event. The event is handled by List.svelte.
	 * @param {import('$lib/types').View} newView - The new view that will be dispatched
	 * @returns void
	 */
	function setView(newView) {
		view = newView;
		dispatch('viewChange', { view });
	}

	onMount(async () => {
		setView(view);
	});
</script>

<div class="flex gap-2">
	<button
		class:bg-base-100={view === 'cards'}
		class="btn btn-ghost btn-sm btn-square"
		on:click={() => setView('cards')}><IconCards class="w-5 h-5" /></button
	>
	<button
		class:bg-base-100={view === 'table'}
		class="btn btn-ghost btn-sm btn-square"
		on:click={() => setView('table')}><IconTable class="w-5 h-5" /></button
	>
</div>
