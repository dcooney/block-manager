import { __ } from '@wordpress/i18n';
import axios from 'axios';

/**
 * Toggle all items in a category.
 *
 * @param {Element}  target            The target element.
 * @param {string}   type              The type of content (blocks/patterns)
 * @param {Function} setDisabled       Sets the disabled state.
 * @param {Function} setCategoryStatus Sets the category state.
 * @param {Function} setNotifications  Sets the notifications state
 */
export default function bulkProcess(
	target,
	type = 'blocks',
	setDisabled,
	setCategoryStatus,
	setNotifications
) {
	const { state } = target.dataset;
	const direction = state === 'active' ? 'disable' : 'enable';

	if (state === 'active') {
		target.classList.add('disabled');
		target.dataset.state = 'inactive';
	} else {
		target.dataset.state = 'active';
	}

	const container =
		target?.parentNode?.parentNode?.querySelector('.gbm-block-list');

	const items = container?.querySelectorAll('.item:not(.filtered)');
	if (!items) {
		return;
	}

	const itemArray = [...items].map(function (block) {
		return block.dataset.id;
	}); // Create array of block IDs/names.

	if (!itemArray?.length) {
		return;
	}

	container.classList.add('loading'); // Add loading state.

	axios({
		method: 'POST',
		url: gbm_localize.root + 'gbm/bulk_process/',
		headers: {
			'X-WP-Nonce': gbm_localize.nonce,
			'Content-Type': 'application/json',
		},
		data: { blocks: itemArray, type, direction },
	})
		.then(function (res) {
			const { data = {}, status } = res;
			const { success = true } = data;

			if (status === 200 && success) {
				[...items].forEach(function (item) {
					if (direction === 'enable') {
						item.classList.remove('disabled');
					} else {
						item.classList.add('disabled');
					}
				});
				container.classList.remove('loading');
				setDisabled(data.disabled);
				setCategoryStatus(items[0]);
				setNotifications((prev) => [
					...prev,
					{
						id: Date.now(),
						msg: data?.msg,
						success,
					},
				]);
			} else {
				container.classList.remove('loading');
				console.warn(__('An error has occurred', 'block-manager'));
			}
		})
		.catch(function (error) {
			container.classList.remove('loading');
			console.warn(error);
		});
}
