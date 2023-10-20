import { removeDisabledBlocks, setBlockCategory, sortBlocks } from './helpers';

/**
 * Get array of blocks for the Category listing.
 *
 * @param {Array} blocks Array of WP Blocks.
 * @return {Array}       Filtered array of blocks.
 */
export function getBlockCategoryData(blocks) {
	if (!blocks?.length) {
		return [];
	}
	return removeDisabledBlocks(setBlockCategory(sortBlocks(blocks)));
}

/**
 * Get all WP blocks with updated categories.
 *
 * @param {Array} blocks             Array of WP Blocks.
 * @param {Array} filteredCategories The filtered categories.
 * @return {Array}                   The list of blocks.
 */
export function getBlocksData(blocks, filteredCategories = []) {
	if (!blocks?.length) {
		return [];
	}

	// Get and sort blocks.
	const wpBlocks = sortBlocks(blocks);

	// Update block categories.
	if (filteredCategories?.length) {
		// Loop saved categories.
		filteredCategories.forEach((item) => {
			const { block: name, cat: category } = item;

			// Find block by name and update category.
			const match = wpBlocks.find((block) => block.name === name);
			if (match) {
				match.category = category;
			}
		});
	}

	return wpBlocks;
}

/**
 * Count total blocks including variations.
 * Loop blocks and return total count.
 *
 * @param {Array} blocks Array of blocks with parent categories
 * @return {number}      Total number of blocks
 */
export function countBlocks(blocks) {
	if (!blocks?.length) {
		return 0;
	}

	let count = 0;
	blocks.forEach((category) => {
		count += category?.blocks?.length;
	});
	return count;
}
