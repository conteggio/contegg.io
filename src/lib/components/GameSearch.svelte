<script lang="ts">
	export let value: string | null = null;
</script>

<form data-sveltekit-reload action="/games/search">
	<div class="form-control">
		<div class="input-group">
			<input
				type="text"
				name="q"
				placeholder="Search for a new game..."
				class="input bg-base-200 focus:outline-none focus:bg-base-100"
				{value}
			/>
			<button class="btn btn-primary btn-square">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
					/>
				</svg>
			</button>
		</div>
	</div>
</form>
