/**
 * Set the status indicator and button states for each category.
 *
 * @param {Element} element The target element.
 */
export default function setCategoryStatus(element) {
	if (!element) {
		return false;
	}
	const parent = element.closest('.gbm-block-group');
	const toggleBtn = parent.querySelector('.gbm-block-switch');
	const items = parent.querySelectorAll('.gbm-block-list .item');

	if (items) {
		const blockArr = Array.prototype.slice.call(items);
		const disabledBlocksFiltered = blockArr.filter((block) => {
			return block.classList.contains('disabled');
		});

		// If disabled === total items, toggle the switch
		if (disabledBlocksFiltered.length === items.length) {
			toggleBtn.classList.add('disabled');
			toggleBtn.dataset.state = 'inactive';
		} else {
			toggleBtn.classList.remove('disabled');
			toggleBtn.dataset.state = 'active';
		}
	}
}
