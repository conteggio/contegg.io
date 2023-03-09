<script>
	// Components
	import GameSearch from '$lib/components/GameSearch.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import List from '$lib/components/list/List.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
	$: ({ games } = data);
</script>

<Heading heading="Games" headingLevel="h1">
	<GameSearch />
</Heading>
<List {games} />
