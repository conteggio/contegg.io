<script lang="ts">
	import type { Player } from '@prisma/client';
	import Card from './Card.svelte';
	export let player: Player;
</script>

<Card href={`/players/${player.id}`}>
	<div slot="body">
		<h2 class="card-title line-clamp-1">{player.name}</h2>
	</div>
</Card>
