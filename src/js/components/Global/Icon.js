import { renderToString } from "@wordpress/element";

/**
 * Block Icon display.
 *
 * @param {Object} props      The component properties.
 * @param {string} props.data The icon source - svg or string.
 * @return {Element}          The Icon component.
 */
export default function Icon({ data }) {
	const type = data?.type ? "react" : "dashicon";
	const src = type === "react" ? renderToString(data) : data;

	const iconSrc =
		type === "dashicon"
			? '<span class="dashicons dashicons-' + src + '"></span>'
			: src;

	return (
		<div className="icon" dangerouslySetInnerHTML={{ __html: iconSrc }}></div>
	);
}
