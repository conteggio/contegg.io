<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const { plays, games } = data;
</script>

<h1>Plays</h1>
<form method="POST" action="?/create">
	<div class="form-control w-full max-w-xs">
		<div class="input-group">
			<select name="gameId" class="select bg-base-200">
				<option hidden selected>Pick a game to play...</option>
				{#each games as game (game.id)}
					<option value={game.id} class="w-full overflow-hidden">{game.name}</option>
				{/each}
			</select>
			<button class="btn">Play</button>
		</div>
	</div>
</form>
<div class="not-prose py-6 flex flex-col space-y-6">
	{#each plays as play (play.id)}
		<a href={`/plays/${play.id}`}>
			<div
				class="card card-compact bg-base-200 hover:bg-base-300 hover:-mr-2 transition-all duration-200 ease-in-out"
			>
				<div class="card-body">
					<div>
						<h2 class="card-title line-clamp-1">{play.game.name}</h2>
						<p><span class="badge badge-success">Finished</span> {play.createdAt}</p>
					</div>
				</div>
			</div>
		</a>
	{/each}
</div>
