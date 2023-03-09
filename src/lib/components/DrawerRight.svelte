<script>
	import { rightDrawerContent, rightDrawerIsOpen } from '../../stores';

	// TODO: Type event correctly (missing event.target.checked)
	/** @param {any} event */
	function handleChange(event) {
		if (event.currentTarget.checked === false) {
			rightDrawerContent.set(null);
		}
	}
</script>

<div class="drawer drawer-end">
	<input
		id="right-drawer"
		type="checkbox"
		class="drawer-toggle"
		bind:checked={$rightDrawerIsOpen}
		on:change={(event) => handleChange(event)}
	/>
	<div class="drawer-content">
		<slot />
	</div>
	<div class="drawer-side">
		<label for="right-drawer" class="drawer-overlay" />
		<div
			id="right-drawer-content"
			class="p-12 bg-neutral text-neutral-content w-[90vw] max-w-[400px] h-full flex flex-col justify-start border-l-2 border-l-base-200"
		/>
	</div>
</div>
