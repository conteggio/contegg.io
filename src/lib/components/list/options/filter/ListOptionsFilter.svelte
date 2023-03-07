<script>
	import { page } from '$app/stores';

	// Components
	import IconFilter from '$lib/components/icon/IconFilter.svelte';
</script>

<form class="not-prose w-full flex items-center gap-4" action="/games">
	<IconFilter class="w-4 h-4" />
	<div class="dropdown dropdown-bottom">
		<label tabindex="0" class="btn btn-xs gap-2">Date Added &#9662</label>
		<div tabindex="0" class="dropdown-content mt-1 rounded-box bg-base-100 shadow-xl p-4">
			<div class="flex flex-col gap-4">
				<div class="flex gap-4">
					<div class="form-control w-28">
						<label class="label">
							<span class="label-text">From</span>
						</label>
						<input
							name="createdAt.gte"
							type="text"
							placeholder="yyyy-mm-dd"
							value={$page.url.searchParams.get('createdAt.gte')}
							class="input input-sm bg-base-200"
						/>
					</div>
					<div class="form-control w-28">
						<label class="label">
							<span class="label-text">To</span>
						</label>
						<input
							name="createdAt.lte"
							type="text"
							placeholder="yyyy-mm-dd"
							value={$page.url.searchParams.get('createdAt.lte')}
							class="input input-sm bg-base-200"
						/>
					</div>
				</div>
				<button type="submit" class="btn btn-sm">Apply Filter</button>
			</div>
		</div>
	</div>
</form>
