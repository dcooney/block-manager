import { useRef } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

/**
 * Render the block Search component.
 *
 * @param {Object}   props          The component properties.
 * @param {Function} props.callback The callback function to dispatch.
 * @return {Element}                The Search component.
 */
export default function Search({ callback }) {
	const inputRef = useRef();

	return (
		<div className="gbm-search">
			<label className="offscreen" htmlFor="gbm-search">
				{__("Search Blocks", "block-manager")}
			</label>
			<input
				type="text"
				id="gbm-search"
				placeholder={__("Search Blocks", "block-manager")}
				onKeyUp={() => callback(inputRef?.current?.value)}
				ref={inputRef}
			/>
			<button
				type="button"
				onClick={() => callback(inputRef?.current?.value)}
			>
				<span className="offscreen">{__("Submit", "block-manager")}</span>
				<span className="dashicons dashicons-search"></span>
			</button>
		</div>
	);
}
