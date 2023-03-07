<script>
	import 'sortable-tablesort/sortable.min.js';
</script>

<div class="not-prose overflow-x-auto">
	<table class="table w-full sortable">
		<slot name="head" />
		<slot name="body" />
	</table>
</div>
