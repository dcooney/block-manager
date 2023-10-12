import { registerCoreBlocks } from "@wordpress/block-library";
import { getBlockTypes } from "@wordpress/blocks";
import { excludedBlocks } from "../constants";
registerCoreBlocks();

/**
 * Get all WP blocks with updated categories.
 *
 * @param {Array} filteredCategories The filtered categories.
 * @return {Array}                   The list of blocks.
 */
export default function getBlockData(filteredCategories = []) {
	let wpBlocks = [];
	const blocks = getBlockTypes();

	if (blocks) {
		// Sort blocks by name.
		wpBlocks = blocks.sort(function (a, b) {
			const textA = a.title.toUpperCase();
			const textB = b.title.toUpperCase();
			return textA < textB ? -1 : textA > textB ? 1 : 0; //eslint-disable-line
		});

		// Remove/Filter out the following blocks.
		wpBlocks = wpBlocks.filter((block) => {
			return excludedBlocks.indexOf(block.name) === -1;
		});
	}

	// Updated block categories.
	if (wpBlocks && filteredCategories?.length > 0) {
		// Loop saved categories.
		filteredCategories.forEach((item) => {
			const { block: name, cat: category } = item;
			// Loop all blocks and update category.
			// eslint-disable-next-line
			const loop = wpBlocks.find(function (block, index) {
				if (block.name === name) {
					wpBlocks[index].category = category;
				}
			});
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
