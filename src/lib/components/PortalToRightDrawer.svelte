<script>
	import Portal from 'svelte-portal';
	import { fade } from 'svelte/transition';
</script>

<Portal target="#right-drawer-content">
	<div out:fade>
		<slot />
	</div>
</Portal>
