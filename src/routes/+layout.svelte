<script lang="ts">
	import { page } from '$app/stores';
	import '@fontsource/sofia-sans';
	import '../app.css';
</script>

<svelte:head>
	<title>{`${$page.data.title} | contegg.io`}</title>
</svelte:head>

<slot />

<style>
	:global(body) {
		font-family: 'Sofia Sans', sans-serif;
	}
</style>
