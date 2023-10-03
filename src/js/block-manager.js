import filterBlockCategories from "./functions/filterBlockCategories";
import domReady from "@wordpress/dom-ready";

// Get options from localized script.
const { blocks, categories } = gutenberg_block_manager;

// Filter WP block categories.
if (categories) {
	filterBlockCategories(categories);
}

// Filter blocks.
domReady(function () {
	if (window?._wpLoadBlockEditor) {
		window._wpLoadBlockEditor.then(function () {
			if (!blocks) {
				return;
			}

			Object.keys(blocks).forEach(function (key) {
				const blockName = blocks[key];
				const is_variation =
					blockName.indexOf("variation") !== -1 ? true : false;
				if (is_variation) {
					// Block Variation handler
					const variation = blockName.split(";"); // e.g. `variation;core/embed;twitter`
					if (variation.length === 3) {
						wp.blocks.unregisterBlockVariation(
							variation[1],
							variation[2],
						); // `core/embed`, `twitter`
					}
				} else {
					// Prevent paragraph from being disabled.
					// eslint-disable-next-line no-lonely-if
					if (
						blockName !== "core/paragraph" &&
						blockName &&
						0 !== blockName.length &&
						undefined !== wp.blocks.getBlockType(blockName)
					) {
						wp.blocks.unregisterBlockType(blockName);
					}
				}
			});
		});
	}
});
