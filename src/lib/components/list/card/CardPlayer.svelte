<script>
	// Components
	import Avatar from '$lib/components/Avatar.svelte';
	import Favorite from '$lib/components/Favorite.svelte';
	import Card from './Card.svelte';

	// Props
	/** @type {import('@prisma/client').Player}*/
	export let player;
</script>

<Card href={`/players/${player.id}`}>
	<div slot="body">
		<div class="flex items-center gap-4">
			<Avatar {player} />
			<h2 class="card-title line-clamp-1">{player.name}</h2>
		</div>
	</div>
	<Favorite class="absolute -top-2 -right-2" slot="corner-action" />
</Card>
