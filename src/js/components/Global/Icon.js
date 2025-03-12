import { renderToString } from '@wordpress/element';

/**
 * Block Icon display.
 *
 * @param {Object} props      The component properties.
 * @param {string} props.icon The icon source - svg or string.
 * @return {Element}          The Icon component.
 * @deprecated 3.1.1
 */
export default function Icon({ icon }) {
	let src = icon?.src || icon;

	// Exit if icon src is block default
	if (src === 'block-default') {
		return null;
	}

	// If icon is a function, render it.
	if (typeof src === 'function') {
		if (src.toString().indexOf('createElement') >= 0) {
			src = src();
		}
	}

	return (
		<div
			aria-hidden="true"
			className="icon"
			dangerouslySetInnerHTML={{ __html: renderToString(src) }}
		></div>
	);
}
