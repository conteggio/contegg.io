<script lang="ts">
	// Components
	import GameSearch from '$lib/components/GameSearch.svelte';
	import List from '$lib/components/list/List.svelte';

	// Types
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>Games</h1>
<GameSearch />
<List games={data.games} />
