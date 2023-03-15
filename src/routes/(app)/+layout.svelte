<script lang="ts">
	import { page } from '$app/stores';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import DrawerRight from '$lib/components/DrawerRight.svelte';
</script>

<DrawerRight>
	<div class="drawer drawer-mobile">
		<input id="nav-drawer" type="checkbox" class="drawer-toggle" />
		<div class="drawer-content">
			<div class="w-full border-b-2 border-b-base-200">
				<div class="container max-w-none px-8 md:px-12 xl:px-16 py-12">
					<div class="flex flex-row items-center justify-between">
						<Breadcrumb path={$page.url.pathname} />
						<label for="nav-drawer" class="btn btn-ghost btn-square drawer-button lg:hidden">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								class="w-6 h-6"
							>
								<path
									fill-rule="evenodd"
									d="M3 9a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 9zm0 6.75a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
									clip-rule="evenodd"
								/>
							</svg>
						</label>
					</div>
				</div>
			</div>

			<div class="container max-w-none px-8 md:px-12 py-12 prose md:prose-lg">
				<slot />
			</div>
		</div>
		<div class="drawer-side">
			<label for="nav-drawer" class="drawer-overlay" />
			<div
				class="bg-neutral text-neutral-content w-72 lg:w-80 h-full flex flex-col justify-start border-r-2 border-r-base-200"
			>
				<div class="p-12">
					<a href="/" class="font-bold no-underline text-3xl"
						>contegg<span class="text-primary">.</span>io</a
					>
				</div>
				<ul class="menu px-8 text-lg">
					<!-- Sidebar content here -->
					<li><a data-sveltekit-reload href="/games">Games</a></li>
					<li><a data-sveltekit-reload href="/plays">Plays</a></li>
					<li><a data-sveltekit-reload href="/players">Players</a></li>
				</ul>
				<ul class="menu px-8 py-8 text-lg mt-auto">
					<!-- Sidebar content here -->
					<li><a>Settings</a></li>
				</ul>
			</div>
		</div>
	</div>
</DrawerRight>
