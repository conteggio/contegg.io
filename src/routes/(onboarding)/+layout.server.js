/** @type {import('./$types').LayoutServerLoad} */
export async function load() {
	return {
		/** @type {Array<String>} */
		phases: ['welcome-phase', 'setup-phase', 'action-phase']
	};
}
