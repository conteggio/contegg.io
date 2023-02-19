<script lang="ts">
	import { Scatter } from 'svelte-chartjs';

	import {
		Chart as ChartJS,
		Title,
		Tooltip,
		Legend,
		LineElement,
		CategoryScale,
		LinearScale,
		PointElement,
		type ChartData
	} from 'chart.js';

	ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

	export let data: ChartData<'scatter', number[], unknown>;
	export let options: any = {
		responsive: true
	};
</script>

<Scatter {data} {options} />
