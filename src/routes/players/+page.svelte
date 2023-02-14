<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	export let data: PageData;
	const { players } = data;
</script>

<h1>Players</h1>
<form method="POST" action="?/create">
	<div class="form-control">
		<div class="input-group">
			<input
				type="text"
				name="name"
				placeholder="Add a new player..."
				class="input bg-base-200 focus:outline-none focus:bg-base-100"
			/>
			<button class="btn btn-square">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="w-6 h-6"
				>
					<path
						fill-rule="evenodd"
						d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
						clip-rule="evenodd"
					/>
				</svg>
			</button>
		</div>
	</div>
</form>
<div class="not-prose py-6 flex flex-col space-y-6">
	{#each players as player (player.id)}
		<a href={`/players/${player.id}`}>
			<div
				class="card card-compact bg-base-200 hover:bg-base-100 transition-color duration-200 ease-in-out"
			>
				<div class="card-body">
					<div>
						<h2 class="card-title line-clamp-1">{player.name}</h2>
					</div>
				</div>
			</div>
		</a>
	{/each}
</div>
