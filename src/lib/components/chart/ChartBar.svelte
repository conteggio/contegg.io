<script lang="ts">
	import { Bar } from 'svelte-chartjs';
	import { BarElement, CategoryScale, Chart, LinearScale, Tooltip, type ChartData } from 'chart.js';

	Chart.defaults.color = '#a6adbb';
	Chart.defaults.borderColor = '#262626';
	Chart.defaults.font.size = 16;
	Chart.defaults.font.family = "'Sofia Sans', sans-serif";
	Chart.defaults.responsive = true;

	Chart.register(Tooltip, BarElement, CategoryScale, LinearScale);

	export let data: ChartData<'bar', number[], unknown>;
	export let options: any;
</script>

<Bar {data} {options} />
