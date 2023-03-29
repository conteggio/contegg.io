/** @type {import("./$types").PageServerLoad} */
export const load = async () => {
	return {
		/** @type {String} - The page title */
		title: 'Action Phase',

		/** @type {Number} - The onboarding progress as a percent */
		progressPercentage: 100
	};
};
