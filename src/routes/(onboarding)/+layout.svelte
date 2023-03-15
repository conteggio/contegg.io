<script>
	import { page } from '$app/stores';
	import OnboardingProgress from '$lib/components/OnboardingProgress.svelte';

	/** @type {import('./$types').LayoutData} */
	export let data;
</script>

<div class="container px-6 py-12 2xl:py-24 max-w-xl min-h-screen flex flex-col mx-auto">
	<OnboardingProgress title={$page.data.title} progressPercentage={$page.data.progressPercentage} />
	<div class="flex-grow pt-12 2xl:pt-24 flex flex-col">
		<slot />
	</div>
</div>
