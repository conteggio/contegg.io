import { writable } from 'svelte/store';

export const rightDrawerIsOpen = writable(false);

/** @type {import('svelte/store').Writable<import('$lib/types').RightDrawerContent>} */
export const rightDrawerContent = writable(null);

/**
 * @param {import('$lib/types').RightDrawerContent} content
 * @returns {void}
 */
export function openRightDrawer(content) {
	rightDrawerContent.set(content);
	rightDrawerIsOpen.set(true);
}

/**
 * @returns {void}
 */
export function closeRightDrawer() {
	rightDrawerContent.set(null);
	rightDrawerIsOpen.set(false);
}
