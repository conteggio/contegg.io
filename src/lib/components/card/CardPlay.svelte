<script lang="ts">
	import type { Play, Game } from '@prisma/client';
	type Prop = Play & {
		game: Game;
	};
	import Card from './Card.svelte';
	export let play: Prop;
</script>

<Card href={`/plays/${play.id}`}>
	<div slot="body">
		<h2 class="card-title line-clamp-1">{play.createdAt.toLocaleDateString()}</h2>
		<p>{play.game.name}</p>
	</div>
</Card>
