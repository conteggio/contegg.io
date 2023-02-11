<script lang="ts">
	import type { PageData, ActionData } from './$types';

	export let data: PageData;
	const { player } = data;
</script>

<h1>Edit Player</h1>
<form method="POST" action="?/update">
	<input type="hidden" name="id" value={player.id} />
	<div class="form-control w-full max-w-xs">
		<label for="name" class="label">
			<span class="label-text">Name</span>
		</label>
		<input
			type="text"
			name="name"
			value={player.name}
			placeholder="Uncle Pennybags"
			class="input bg-base-200 w-full max-w-xs"
		/>
	</div>
	<button class="btn btn-primary mt-6">Save</button>
</form>
