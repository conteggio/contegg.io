<script>
	import { enhance } from '$app/forms';
	import IconCheckCircle from '../icon/IconCheckCircle.svelte';

	/** @type {?Promise<any>} - The result of getText() */
	let promise;

	/** @type {?HTMLInputElement} - The file input element */
	let fileInput;

	function handleFileInput() {
		if (fileInput?.files) {
			promise = getText(fileInput.files[0]);
		}
	}

	/**
	 * @param {File} file - The uploaded file
	 * @returns {Promise<any>} - The parsed JSON
	 */
	async function getText(file) {
		/** @type {String} - The file content as a string */
		const text = await file.text();
		return JSON.parse(text);
	}
</script>

<form
	method="POST"
	action="/setup-phase/import/board-game-stats?/bgstats"
	enctype="multipart/form-data"
	class="flex-grow flex flex-col items-start gap-4"
	use:enhance
>
	<div class="form-control w-full">
		<label for="file" class="label">
			<span class="label-text">JSON File</span>
		</label>
		<input
			required
			type="file"
			accept="application/json"
			name="file"
			id="file"
			class="file-input file-input-bordered w-full"
			bind:this={fileInput}
			on:change={handleFileInput}
		/>
		<label for="file" class="label">
			<span class="label-text italic"
				>Tip: Settings > Export, import and backup > Export backup file…</span
			>
		</label>
	</div>

	{#if fileInput?.files && promise}
		{#await promise}
			loading
		{:then file}
			<div class="not-prose w-full card card-compact bg-base-200">
				<div class="card-body">
					<div class="card-title">
						<IconCheckCircle class="text-success w-6 h-6" />
						<h3>Valid File</h3>
					</div>
					<div class="text-lg">
						<p>The following will be imported:</p>
						<ul class="list-disc list-inside marker:text-primary grid grid-cols-2">
							<li>{file.games?.length || 0} games</li>
							<li>{file.plays?.length || 0} plays</li>
							<li>{file.players?.length || 0} players</li>
							<li>{file.locations?.length || 0} locations</li>
						</ul>
					</div>
				</div>
			</div>
		{:catch error}
			<div class="not-prose w-full card card-compact bg-base-200">
				<div class="card-body">
					<div class="card-title">
						<IconCheckCircle class="text-success w-6 h-6" />
						<h3>Invalid File</h3>
					</div>
					<div class="text-lg">
						{error}
					</div>
				</div>
			</div>
		{/await}
	{/if}
	<button type="submit" class="mt-auto ml-auto btn btn-primary">Import</button>
</form>
