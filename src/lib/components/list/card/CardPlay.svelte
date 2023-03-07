<script>
	import Card from './Card.svelte';

	/** @type {import('@prisma/client').Prisma.PlayGetPayload<{
	 * include: {
	 *  game: true
	 * }
	 * }>}*/
	export let play;
</script>

<Card href={`/plays/${play.id}`}>
	<div class="aspect-[6/4] overflow-hidden rounded-t-[inherit]" slot="image">
		<img src={play.game.bggThumbnail} class="object-cover w-full h-full" alt="" srcset="" />
	</div>
	<div slot="body">
		<h2 class="card-title line-clamp-1">{play.game.name}</h2>
		<p class="italic">on {play.createdAt.toLocaleDateString()}</p>
	</div>
</Card>
