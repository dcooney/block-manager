import React from 'react';

/**
 * Block Icon display.
 *
 * @param {string} src The svg source.
 * @param {string} type The type of icon.
 */
function Icon({ src, type }) {
	let iconSrc = type === 'dashicon' ? '<span class="dashicons dashicons-' + src + '"></span>' : src;

	// Custom Heading Icon
	if (src === 'heading') {
		iconSrc =
			'<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true" focusable="false"><path d="M5 4v3h5.5v12h3V7H19V4z"></path><path fill="none" d="M0 0h24v24H0V0z"></path></svg>';
	}

	return <div className="icon" dangerouslySetInnerHTML={{ __html: iconSrc }}></div>;
}
export default Icon;
