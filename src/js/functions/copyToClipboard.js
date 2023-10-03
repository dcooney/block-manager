import { __ } from "@wordpress/i18n";

/**
 * Copy export code to clipboard.
 *
 * @param {Element} input   The code input element.
 * @param {Element} trigger The button trigger element.
 */
export default function copyToClipboard(input, trigger) {
	if (!input) return;

	const range = document.createRange();
	range.selectNodeContents(input);
	const sel = window?.getSelection(); //eslint-disable-line
	sel.removeAllRanges();
	sel.addRange(range);

	// Copy to clipboard.
	document.execCommand("copy");
	if (trigger) {
		// Set the Copy button text.
		trigger.innerHTML = __("Copied", "block-manager");
		setTimeout(function () {
			trigger.disabled = true;
		}, 500);
	}
}
