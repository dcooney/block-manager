const { addFilter } = wp.hooks;

/**
 * Use hooks to switch the block categories.
 *
 * @param {*} options The WP option returned via localized script.
 */
export default function filterBlockCategories(options) {
	if (!options) {
		return false; // Exit if empty.
	}
	let categories = {};
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

		// we need to pass along the settings object
		// even if we haven't modified them!
		return settings;
	};

	// Add filter when blocks register.
	addFilter(
		'blocks.registerBlockType', // hook name, important!
		'gbm/filter-blocks', // your name, arbitrary!
		filterBlocks // function to run.
	);
}
