<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const { game } = data;
</script>

<h1>Edit Game</h1>
<form method="POST" action="?/update" class="flex flex-col gap-6 items-start">
	<input type="hidden" name="id" value={game.id} />
	<div class="form-control w-full">
		<label for="name" class="label">
			<span class="label-text">Name</span>
		</label>
		<input type="text" name="name" value={game.name} class="input bg-base-200 w-full" />
	</div>
	<div class="form-control w-full">
		<label for="name" class="label">
			<span class="label-text">Description</span>
		</label>
		<textarea
			name="description"
			value={game.description}
			rows={3}
			class="textarea bg-base-200 w-full"
		/>
	</div>
	<button class="btn btn-primary mt-6">Save</button>
</form>
