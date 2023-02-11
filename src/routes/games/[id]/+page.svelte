<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const { game } = data;
</script>

<div class="w-full flex flex-row justify-between">
	<h1>{game.name}</h1>
	<div class="flex space-x-2">
		<a href={`/games/${game.id}/edit`} class="btn btn-ghost btn-square">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				class="w-6 h-6"
			>
				<path
					d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"
				/>
			</svg>
		</a>
		<label for="delete-game-modal" class="btn btn-ghost btn-square">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				class="w-6 h-6"
			>
				<path
					fill-rule="evenodd"
					d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
					clip-rule="evenodd"
				/>
			</svg>
		</label>
	</div>
</div>
<div class="w-full flex flex-col md:flex-row gap-6 justify-between">
	<div class="stat rounded-2xl bg-green-100 text-green-900">
		<div class="stat-title font-">Wins</div>
		<div class="stat-value">31</div>
		<div class="stat-desc">All Time</div>
	</div>

	<div class="stat rounded-2xl bg-red-100 text-red-900">
		<div class="stat-title">Losses</div>
		<div class="stat-value">44</div>
		<div class="stat-desc">All Time</div>
	</div>

	<div class="stat rounded-2xl bg-indigo-100 text-indigo-900">
		<div class="stat-title">Win Rate</div>
		<div class="stat-value">1,200</div>
		<div class="stat-desc">All Time</div>
	</div>
</div>
<h2>Plays</h2>
{#each game.plays as play (play.id)}
	<p>{play.createdAt}</p>
{/each}

<input type="checkbox" id="delete-game-modal" class="modal-toggle" />
<div class="modal not-prose">
	<div class="modal-box">
		<h3 class="font-bold text-lg">Are you sure you want to delete {game.name}?</h3>
		<p class="py-4">
			By deleting this game, you will lose all play data. If you would like to keep your play data,
			you may archive this game.
		</p>
		<div class="modal-action">
			<label for="delete-game-modal" class="btn btn-outline">Nevermind</label>
			<form method="POST" action="/games?/delete">
				<input name="id" type="hidden" value={game.id} />
				<button class="btn btn-error">Delete Game</button>
			</form>
		</div>
	</div>
</div>
