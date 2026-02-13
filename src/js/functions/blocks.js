import { variationBlocks } from '../constants';
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
 * Get all WP blocks and variations with updated categories.
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

	return getAllBlocksAndVariations(wpBlocks);
}

/**
 * Get an array of blocks and any block variations.
 * Block variations are stored in a nested `variations` array of each block.
 *
 * @param {Array} blocks Array of blocks.
 * @return {Array}       Array of blocks with variations included.
 */
export function getAllBlocksAndVariations(blocks) {
	if (!blocks?.length) {
		return [];
	}
	const WPBlocks = [];

	// Loop all blocks.
	blocks.forEach((block) => {
		const { name, variations, category, title } = block;
		WPBlocks.push(block);

		if (!variationBlocks?.length) {
			return;
		}

		if (variationBlocks.includes(name) && variations?.length) {
			// Loop block variations and push into blocks array as a top level item.
			variations.forEach((variation) => {
				if (title === variation?.title) {
					/**
					 * Skip if variation title matches parent block title.
					 * This fix is needed for paragraph and heading blocks which
					 * have a variation with the same title as the parent block.
					 */
					return;
				}
				WPBlocks.push({
					...variation,
					name: `variation;${name};${variation?.name}`,
					variation: name,
					prefix: title,
					category,
				});
			});
		}
	});
	return WPBlocks;
}

/**
 * Count total disabled and filtered blocks.
 * Make sure block is installed when being counted.
 *
 * @param {Array} blocks   Array of blocks with parent categories.
 * @param {Array} disabled Array of disabled blocks.
 * @param {Array} filtered Array of filtered blocks.
 * @return {Object}        Total number of blocks in an object.
 */
export function countDisabledBlocks(blocks, disabled, filtered) {
	return {
		disabledCount: blocks.filter((block) => {
			return disabled?.includes(block.name);
		})?.length,
		filteredCount: blocks.filter((block) => filtered?.includes(block.name))
			?.length,
	};
}

/**
 * Count total blocks including variations.
 * Loop blocks and return total count.
 *
 * @param {Array} blocks Array of blocks with parent categories
 * @return {number}      Total number of blocks
 * @deprecated 2.1
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
