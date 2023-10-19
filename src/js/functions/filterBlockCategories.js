import { addFilter } from '@wordpress/hooks';

/**
 * Use hooks to switch the block categories.
 *
 * @param {*} options The WP option returned via localized script.
 */
export default function filterBlockCategories(options) {
	if (!options) {
		return false; // Exit if empty.
	}
	const categories = {};
	options.forEach((cat) => {
		// Extract values from object.
		const values = Object.values(cat);

		// Convert values into object.
		categories[values[0]] = values[1];
	});

	/**
	 * Filter WP Blocks.
	 *
	 * @param {*} settings
	 * @param {*} name
	 */
	const filterBlocks = (settings, name) => {
		if (categories[name]) {
			settings.category = categories[name];
			settings.gbm = true;
		}

		return settings;
	};

	// Add filter when blocks register.
	addFilter('blocks.registerBlockType', 'gbm/filter-blocks', filterBlocks);
}
