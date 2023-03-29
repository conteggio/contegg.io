/** @type {import("./$types").PageServerLoad} */
export const load = async () => {
	return {
		/** @type {String} - The page title */
		title: 'Setup Phase',

		/** @type {Number} - The onboarding progress as a percent */
		progressPercentage: (100 / 3) * 2
	};
};
