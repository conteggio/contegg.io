<script>
	/** @type {String} - The page title */
	export let title;

	/** @type {Number} - The onboarding progress as a percent */
	export let progressPercentage;
</script>

<div class="w-full flex flex-col gap-2">
	<h1>{title}</h1>
	<progress
		class="progress progress-primary bg-base-200 w-full"
		value={progressPercentage}
		max="100"
	/>
</div>
