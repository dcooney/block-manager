import {
	getBlockType,
	unregisterBlockType,
	unregisterBlockVariation,
} from '@wordpress/blocks';
import domReady from '@wordpress/dom-ready';
import filterBlockCategories from './functions/filterBlockCategories';

// Get options from localized script.
const { blocks, categories } = gutenberg_block_manager;

// Filter WP block categories.
if (categories) {
	filterBlockCategories(categories);
}

// Filter blocks.
domReady(function () {
	if (!blocks?.length) {
		return;
	}
	blocks.forEach(function (block) {
		const blockType = getBlockType(block);
		const is_variation = block.indexOf('variation') !== -1; // e.g. `variation;core/embed;twitter`
		if (is_variation) {
			// Block Variation handler
			const variation = block.split(';'); // e.g. `variation;core/embed;twitter`
			if (variation?.length === 3) {
				unregisterBlockVariation(variation[1], variation[2]); // `core/embed`, `twitter`
			}
		} else if (block !== 'core/paragraph' && blockType !== undefined) {
			// Prevent paragraph from being disabled because it will literally break everything.
			unregisterBlockType(block);
		}
	});
});
