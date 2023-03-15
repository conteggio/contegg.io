/** @type {import("./$types").PageServerLoad} */
export const load = async () => {
	return {
		/** @type {String} - The page title */
		title: 'Welcome Phase',

		/** @type {Number} - The onboarding progress as a percent */
		progressPercentage: 100 / 3
	};
};
