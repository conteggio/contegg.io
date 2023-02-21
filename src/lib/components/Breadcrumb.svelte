<script lang="ts">
	export let path: string;

	type Crumb = {
		label: string;
		href: string;
	};

	let crumbs: Crumb[];

	$: {
		const tokens = path.split('/').filter((t) => t !== '');

		// Create { label, href } pairs for each token.
		let tokenPath = '';
		crumbs = tokens.map((t) => {
			tokenPath += '/' + t;
			return {
				label: t,
				href: tokenPath
			};
		});

		// Add a way to get home too.
		crumbs.unshift({ label: 'home', href: '/' });
	}
</script>

<div class="breadcrumbs py-0">
	<ul>
		{#each crumbs as { label, href }, i}
			<li data-testid={`${label}-crumb`} class="capitalize">
				{#if i == crumbs.length - 1}
					{label}
				{:else}
					<a data-testid={`${label}-link`} {href}>{label}</a>
				{/if}
			</li>
		{/each}
	</ul>
</div>
