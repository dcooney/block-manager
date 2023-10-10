import { getCategories } from "@wordpress/blocks";

/**
 * Get all WP block categories.
 *
 * @return {Array} The array of categories.
 */
export default function getCategoryData() {
	let wpCategories = [];

	// Get WP Block Categories
	const categories = getCategories();

	if (categories) {
		// Sort categories by name.
		wpCategories = categories.sort(function (a, b) {
			const textA = a.title.toUpperCase();
			const textB = b.title.toUpperCase();
			return textA < textB ? -1 : textA > textB ? 1 : 0; // eslint-disable-line
		});

		// Filter categories for `reusable`.
		wpCategories = wpCategories.filter((cat) => {
			return cat.slug !== "reusable";
		});
	}

	return wpCategories;
}

export function organizeCategories(categories, blocks) {
	if (!categories || !blocks) {
		return false;
	}

	// Loop through categories.
	const organized = categories.map((category) => {
		// Add blocks to category.
		category.blocks = blocks.filter((block) => {
			return block.category === category.slug;
		});
		return category;
	});
	console.log(organized);
}
