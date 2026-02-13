import { excludedBlocks } from '../constants';

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
				(item) => item.block === block.name
			);
			if (match) {
				block.orginalCategory = block.category;
				block.category = match.cat;
			} else {
				block.orginalCategory = block.category;
			}
		} else {
			block.orginalCategory = block.category;
		}
		return block;
	});
}

/**
 * Filter blocks to see if they are disabled or not active(installed) on the site.
 *
 * @param {Array} data        The data to filter.
 * @param {Array} disabled    Array of disabled blocks.
 * @param {Array} block_names Array of block names.
 * @return {number}           Length of the array.
 */
export function categoryOffsetCount(data, disabled, block_names) {
	return data.filter((item) => {
		// Increment count if block is disabled or not in the block_names array.
		return (
			disabled.includes(item.block) || !block_names.includes(item?.block)
		);
	}).length;
}
