<script>
	import IconBoardGameGeek from '$lib/components/icon/IconBoardGameGeek.svelte';
</script>

<div class="flex flex-col gap-12 mb-12 text-xl">
	<div>
		<h2 class="font-bold text-4xl">Tracked plays elsewhere?</h2>
		<p class="opacity-80">Don't worry, we've got you covered.</p>
	</div>
	<div class="flex flex-col gap-4">
		<button
			class="btn btn-block lg:btn-lg gap-4 justify-between bg-[#3f3a60] hover:bg-[#3f3a60]/80 text-white"
		>
			<IconBoardGameGeek class="h-8" />
			Import from Board Game Geek
		</button>
		<a
			href="/setup-phase/import/board-game-stats"
			class="btn lg:btn-lg just gap-4 justify-between bg-[#273039] hover:bg-[#273039]/80"
		>
			<img class="w-8 h-8" src="/images/BGStatsLogo.png" alt="Board Game Stats Logo" />
			Import from Board Game Stats
		</a>
	</div>
</div>
<a href="/action-phase" class="mt-auto ml-auto btn btn-accent">Skip Import</a>
