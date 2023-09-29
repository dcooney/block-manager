import { renderToString } from "@wordpress/element";

/**
 * Block Icon display.
 *
 * @param {Object} props      The component properties.
 * @param {string} props.icon The icon source - svg or string.
 * @return {Element}          The Icon component.
 */
export default function Icon({ icon }) {
	const src = icon?.src || icon;

	if (src === "block-default") {
		return null;
	}

	return (
		<div
			aria-hidden="true"
			className="icon"
			dangerouslySetInnerHTML={{ __html: renderToString(src) }}
		></div>
	);
}
