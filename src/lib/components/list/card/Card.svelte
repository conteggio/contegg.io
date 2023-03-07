<script>
	/** @type {String} */
	export let href;
</script>

<div class="not-prose relative group">
	<a {href}>
		<div
			class="card card-compact bg-base-200 hover:bg-base-100 transition-color duration-200 ease-in-out"
		>
			<slot name="image" />
			<div class="card-body">
				<slot name="body" />
			</div>
		</div>
	</a>
	<slot name="corner-action" />
</div>
