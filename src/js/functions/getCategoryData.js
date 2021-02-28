/**
 * Get all WP block categories.
 *
 * @return {array}
 */
function getCategoryData() {
	// Get WP Block Categories
	const categories = wp.blocks.getCategories();
	let wpCategories = '';

	if (categories) {
		// Sort categories by name.
		wpCategories = categories.sort(function (a, b) {
			const textA = a.title.toUpperCase();
			const textB = b.title.toUpperCase();
			return textA < textB ? -1 : textA > textB ? 1 : 0;
		});

		// Filter categories for `reusable`.
		wpCategories = wpCategories.filter((cat) => {
			return cat.slug !== 'reusable';
		});
	}

	return wpCategories;
}

export default getCategoryData;
