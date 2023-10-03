import { forwardRef } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

/**
 * Render the Export blocks button.
 *
 * @return {Element} The Export component.
 */
const Export = forwardRef(function Export(props, ref) {
	const { callback, total = 0 } = props;
	return (
		<button
			ref={ref}
			type="button"
			className="resetblocks"
			onClick={() => callback()}
			title={__(
				"Export the list of disabled blocks via WordPress filter",
				"block-manager",
			)}
			disabled={total < 1}
		>
			<span className="dashicons dashicons-database-export"></span>
			{__("Export", "block-manager")}
		</button>
	);
});
export default Export;
