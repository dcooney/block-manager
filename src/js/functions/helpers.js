import { excludedBlocks } from "../constants";

/**
 * Sort the blocks alpha and then remove excluded blocks.
 *
 * @param {Array} blocks Array of WP Blocks.
 * @return {Array}       The sorted array of blocks.
 */
export function sortBlocks(blocks) {
	return blocks
		.sort(function (a, b) {
			const textA = a.title.toUpperCase();
			const textB = b.title.toUpperCase();
			return textA < textB ? -1 : textA > textB ? 1 : 0; //eslint-disable-line
		})
		.filter((block) => {
			return excludedBlocks.indexOf(block.name) === -1;
		});
}

/**
 * Remove all disabled blocks from blocks array.
 *
 * @param {Array} blocks Array of WP Blocks.
 * @return {Array}       Filtered array of blocks.
 */
export function removeDisabledBlocks(blocks = []) {
	if (!blocks?.length) {
		return [];
	}

	const { disabledBlocksAll: disabled = [] } = gbm_localize;
	if (!disabled?.length) {
		return blocks;
	}

	return blocks?.filter((block) => {
		return !disabled?.includes(block?.name);
	});
}

/**
 * Set block categories.
 *
 * @param {Array} blocks Array of WP Blocks.
 * @return {Array}       Modified blocks with categories.
 */
export function setBlockCategory(blocks = []) {
	const { filteredCategoriesAll = [] } = gbm_localize;
	return blocks.map((block) => {
		if (filteredCategoriesAll?.length) {
			const match = filteredCategoriesAll.find(
				(item) => item.block === block.name,
			);
			if (match) {
				block.orginalCategory = block.category;
				block.category = match.cat;
			} else {
				block.orginalCategory = block.category;
			}
		}
		return block;
	});
}