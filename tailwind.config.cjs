/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	daisyui: {
		themes: [
			{
				dark: {
					primary: '#f99155',
					secondary: '#6D3A9C',
					accent: '#2d2d2d',
					neutral: '#171717',
					'neutral-content': '#d1d1d1',
					'base-300': '#1e1e1e',
					'base-200': '#262626',
					'base-100': '#2d2d2d',
					'base-content': '#d1d1d1',
					info: '#2563EB',
					success: '#c7eb74',
					warning: '#f6f63b',
					error: '#ae5154',

					'--btn-text-case': 'capitalize' // set default text transform for buttons
				}
			}
		]
	},
	plugins: [
		require('@tailwindcss/line-clamp'),
		require('@tailwindcss/typography'),
		require('daisyui')
	]
};
