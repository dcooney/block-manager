import setFilteredCategories from '../functions/filterBlockCategories';
/**
 * Get all WP blocks.
 *
 * @return {array}
 */
function getBlockData() {
	// Filter WP block categories.
	const gbm_categories = gbm_localize.filteredCategories;
	if (gbm_categories) {
		setFilteredCategories(gbm_categories);
	}

	// Load Block Library.
	wp.blockLibrary.registerCoreBlocks();

	// Get WP Block Info.
	let blocks = wp.blocks.getBlockTypes();

	let wpBlocks = '';
	if (blocks) {
		// Sort blocks by name.
		wpBlocks = blocks.sort(function (a, b) {
			const textA = a.title.toUpperCase();
			const textB = b.title.toUpperCase();
			return textA < textB ? -1 : textA > textB ? 1 : 0;
		});

		// Filter `core/missing` & `core/block` blocks
		wpBlocks = wpBlocks.filter((block) => {
			return block.name !== 'core/missing' && block.name !== 'core/block';
		});
	}

	return wpBlocks;
}

export default getBlockData;
