<script lang="ts">
	import List from '$lib/components/list/List.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
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
			<button class="btn btn-primary btn-square">
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
<List players={data.players} />
