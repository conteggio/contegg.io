<script>
	import Favorite from '$lib/components/Favorite.svelte';

	// Components
	import Card from './Card.svelte';

	// Props
	/** @type {import('@prisma/client').Game} */
	export let game;
</script>

<Card href={`/games/${game.id}`}>
	<div class="aspect-[6/4] overflow-hidden rounded-t-[inherit]" slot="image">
		<img src={game.bggThumbnail} class="object-cover w-full h-full" alt="" srcset="" />
	</div>
	<div slot="body">
		<h2 class="card-title line-clamp-1">{game.name}</h2>
	</div>
	<Favorite class="absolute -top-2 -right-2" slot="corner-action" />
</Card>
