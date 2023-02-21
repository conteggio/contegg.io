<script lang="ts">
	import { fade } from 'svelte/transition';

	export let href: string;
</script>

<div class="not-prose" in:fade|local>
	<a {href}>
		<div
			class="card card-compact card-side bg-base-200 hover:bg-base-100 transition-color duration-200 ease-in-out overflow-hidden"
		>
			<slot name="image" />
			<div class="card-body">
				<slot name="body" />
			</div>
		</div>
	</a>
</div>
