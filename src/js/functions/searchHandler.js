/**
 * Handle search.
 *
 * @param {string} term The search term.
 */
export default function searchHandler(term, callback) {
	let count = 0;
	const groups = document.querySelectorAll('.gbm-block-group');
	if (!groups?.length) {
		return;
	}

	if (term !== '') {
		[...groups].forEach(function (group) {
			let total = 0;
			const theBlocks = group.querySelectorAll('.item');
			[...theBlocks].forEach(function (block, index) {
				const str = block.dataset.title.toLowerCase();
				const found = str.search(term.toLowerCase());

				// Show/hide blocks.
				if (found !== -1) {
					block.removeAttribute('style');
					total++;
					count++;
				} else {
					block.style.display = 'none';
				}

				// Show/hide entire group if no results.
				if (theBlocks.length === index + 1) {
					if (total === 0) {
						group.style.display = 'none';
					} else {
						group.removeAttribute('style');
					}
				}
			});
		});
		callback({ term, results: count });
	} else {
		callback({ term: '', results: 0 });
		[...groups].forEach(function (group) {
			group.removeAttribute('style');
			const theBlocks = group.querySelectorAll('.item');
			[...theBlocks].forEach(function (block) {
				block.removeAttribute('style');
			});
		});
	}
}
