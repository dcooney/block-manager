/**
 * Get all WP blocks and updated categories.
 *
 * @return {array}
 */
function getBlockData() {
	// Load Block Library.
	wp.blockLibrary.registerCoreBlocks();

	// Get WP Block Info.
	const blocks = wp.blocks.getBlockTypes();
	let wpBlocks = '';
	if (blocks) {
		// Sort blocks by name.
		wpBlocks = blocks.sort(function(a, b) {
			const textA = a.title.toUpperCase();
			const textB = b.title.toUpperCase();
			return textA < textB ? -1 : textA > textB ? 1 : 0;
		});

		// Filter out the following blocks.
		wpBlocks = wpBlocks.filter(block => {
			return block.name !== 'core/missing' && block.name !== 'core/block';
		});
	}

	// Updated block categories.
	const filteredCats = gbm_localize.filteredCategories;
	if (wpBlocks && filteredCats && filteredCats.length > 0) {
		// Loop saved categories..
		filteredCats.forEach(item => {
			const name = item.block;
			const category = item.cat;
			// Loop all blocks.
			const loop = wpBlocks.find(function(block, index) {
				if (block.name === name) {
					wpBlocks[index].category = category;
				}
			});
		});
	}

	return wpBlocks;
}

export default getBlockData;
