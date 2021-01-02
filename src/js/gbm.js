window._wpLoadBlockEditor.then(function () {
	const blocks = gutenberg_block_manager;
	Object.keys(blocks).forEach(function (key) {
		const blockName = blocks[key];
		const is_variation = blockName.indexOf("variation") !== -1 ? true : false;
		if (is_variation) {
			// Block Variation handler
			const variation = blockName.split(";"); // e.g. `variation;core/embed;twitter`
			if (variation.length === 3) {
				wp.blocks.unregisterBlockVariation(variation[1], variation[2]); // `core/embed`, `twitter`
			}
		} else {
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
