<script lang="ts">
	import type { PageData, ActionData } from './$types';

	export let data: PageData;

	export let form: ActionData;
</script>

<h1>New Game</h1>
<form method="POST">
	<label>
		Name
		<input name="name" type="text" />
	</label>
	<label>
		Description
		<input name="description" type="textarea" />
	</label>
	<button>Create Game</button>
</form>
{#if form?.res}
	<p>Success! {form.res.name} has been created!</p>
{/if}
