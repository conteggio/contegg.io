<script lang="ts">
	import { page } from '$app/stores';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import TheHeader from '$lib/components/TheHeader.svelte';
	import '@fontsource/sofia-sans';
	import '../app.css';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	const { paths } = data;
</script>

<div class="drawer drawer-mobile">
	<input id="drawer" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content flex flex-col items-center justify-start">
		<!-- Page content here -->
		<div class="container mx-auto py-12 prose md:prose-lg">
			<Breadcrumb path={$page.url.pathname} />
			<slot />
		</div>
	</div>
	<div class="drawer-side">
		<label for="drawer" class="drawer-overlay" />
		<div class="bg-neutral text-neutral-content h-full flex flex-col justify-start">
			<div class="p-12">
				<a href="/" class="font-bold no-underline text-3xl"
					>contegg<span class="text-secondary">.</span>io</a
				>
			</div>
			<ul class="menu px-8 w-80 text-lg">
				<!-- Sidebar content here -->
				<li><a href="/games">Games</a></li>
				<li><a href="/plays">Plays</a></li>
				<li><a href="/players">Players</a></li>
			</ul>
			<ul class="menu px-8 py-8 w-80 text-lg mt-auto">
				<!-- Sidebar content here -->
				<li><a>Settings</a></li>
			</ul>
		</div>
	</div>
</div>

<style>
	:global(body) {
		font-family: 'Sofia Sans', sans-serif;
	}
</style>
