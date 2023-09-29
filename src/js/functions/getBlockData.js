import { registerCoreBlocks } from "@wordpress/block-library";
import { getBlockTypes } from "@wordpress/blocks";
registerCoreBlocks();

/**
 * Get all WP blocks and updated categories.
 *
 * @return {Array} The list of blocks.
 */
export default function getBlockData() {
	let wpBlocks = [];

	const blocks = getBlockTypes();

	if (blocks) {
		// Sort blocks by name.
		wpBlocks = blocks.sort(function (a, b) {
			const textA = a.title.toUpperCase();
			const textB = b.title.toUpperCase();
			return textA < textB ? -1 : textA > textB ? 1 : 0; //eslint-disable-line
		});

		// Filter out the following blocks.
		wpBlocks = wpBlocks.filter((block) => {
			return block.name !== "core/missing" && block.name !== "core/block";
		});
	}

	// Updated block categories.
	const filteredCats = gbm_localize.filteredCategories;
	if (wpBlocks && filteredCats?.length > 0) {
		// Loop saved categories..
		filteredCats.forEach((item) => {
			const name = item.block;
			const category = item.cat;
			// Loop all blocks.
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
