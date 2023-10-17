import { registerCoreBlocks } from "@wordpress/block-library";
import { excludedBlocks } from "../constants";
import { setBlockCategory, sortBlocks } from "./helpers";
registerCoreBlocks();

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
	return setBlockCategory(sortBlocks(blocks));
}

/**
 * Get all WP blocks with updated categories.
 *
 * @param {Array} blocks             Array of WP Blocks.
 * @param {Array} filteredCategories The filtered categories.
 * @return {Array}                   The list of blocks.
 */
export function getBlockData(blocks, filteredCategories = []) {
	if (!blocks?.length) {
		return [];
	}

	// Sort block alpha and then remove excluded blocks.
	const wpBlocks = sortBlocks(blocks).filter((block) => {
		return excludedBlocks.indexOf(block.name) === -1;
	});

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
