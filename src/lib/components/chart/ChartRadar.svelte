<script lang="ts">
	import { Radar } from 'svelte-chartjs';

	import {
		Chart as ChartJS,
		Title,
		Tooltip,
		Legend,
		PointElement,
		RadialLinearScale,
		LineElement,
		type ChartData
	} from 'chart.js';
	import type { _DeepPartialObject } from 'chart.js/dist/types/utils';

	ChartJS.register(Title, Tooltip, Legend, PointElement, RadialLinearScale, LineElement);

	export let data: ChartData<'radar', number[], unknown>;
	export let options: any = {
		responsive: true
	};
</script>

<Radar {data} {options} />
