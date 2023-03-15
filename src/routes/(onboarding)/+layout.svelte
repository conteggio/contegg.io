<script>
	import { page } from '$app/stores';
	import OnboardingProgress from '$lib/components/OnboardingProgress.svelte';

	/** @type {import('./$types').LayoutData} */
	export let data;
</script>

<div class="container px-6 py-12 sm:py-24 max-w-lg min-h-screen flex flex-col mx-auto">
	<OnboardingProgress title={$page.data.title} progressPercentage={$page.data.progressPercentage} />
	<div class="flex-grow pt-24 flex flex-col">
		<slot />
	</div>
</div>
