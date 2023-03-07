<script>
	// Components
	import ListViewSelector from '$lib/components/list/options/ListViewSelector.svelte';
</script>

<!-- TODO: Once filters are implemented, change justify-end to justify-between -->
<div class="mt-4 flex justify-end items-center">
	<!-- TODO: Uncomment the line below once filters are implemented -->
	<!-- <ListOptionsFilter /> -->
	<ListViewSelector on:viewChange />
</div>
