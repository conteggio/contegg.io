<script>
	/** @type {String} */
	export let heading;

	/** @type {'h1' | 'h2'} */
	export let headingLevel;

	/** @type {?String} */
	export let additionalText = null;
</script>

<div
	class="not-prose w-full flex flex-row justify-between items-center flex-wrap sm:flex-nowrap gap-6 mb-12"
>
	<div class="flex flex-col">
		{#if headingLevel === 'h1'}
			<h1 class="line-clamp-1 font-bold text-3xl xl:text-5xl text-base-content">{heading}</h1>
		{:else}
			<h2 class="line-clamp-1 font-bold text-3xl text-base-content">{heading}</h2>
		{/if}

		{#if additionalText}
			<span>{additionalText}</span>
		{/if}
	</div>

	<!-- Actions -->
	<div class="flex space-x-2 empty:hidden">
		<slot />
	</div>
</div>
