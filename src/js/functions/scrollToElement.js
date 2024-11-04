/**
 * Scroll to the element with the given id.
 *
 * @param {string} id Element ID
 */
export default function scrollToElement(id) {
	if (!id) {
		return;
	}

	const target = document.querySelector(`#${id}`);
	if (target) {
		const top = target.getBoundingClientRect().top + window.scrollY - 110;
		window.scrollTo({
			top,
			behavior: 'smooth',
		});
		target.focus({ preventScroll: true });
	}
}
