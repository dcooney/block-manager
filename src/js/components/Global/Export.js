import { forwardRef } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

/**
 * Render the Export blocks button.
 *
 * @return {Element} The Export component.
 */
const Export = forwardRef(function Export(props, ref) {
	const { callback, total = 0, title } = props;
	return (
		<button
			ref={ref}
			type="button"
			onClick={() => callback()}
			title={title}
			disabled={total < 1}
		>
			<span className="dashicons dashicons-database-export"></span>
			{__("Export", "block-manager")}
		</button>
	);
});
export default Export;
