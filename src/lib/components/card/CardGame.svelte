<script lang="ts">
	import type { Game } from '@prisma/client';
	import Card from './Card.svelte';
	export let game: Game;
</script>

<Card href={`/games/${game.id}`}>
	<div class="aspect-[6/4] h-[84px]" slot="image">
		<img src={game.bggThumbnail} class="object-cover w-full h-full" alt="" srcset="" />
	</div>
	<div slot="body">
		<h2 class="card-title line-clamp-1">{game.name}</h2>
	</div>
</Card>
