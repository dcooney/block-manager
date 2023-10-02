import { useRef } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

/**
 * Render the block Search component.
 *
 * @return {Element} The Search component.
 */
export default function Search() {
	const inputRef = useRef();

	/**
	 * Handle search.
	 */
	function handleSearch() {
		const blocks = document.querySelectorAll(
			".gbm-blocks .gbm-block-list .item",
		);
		const blockArray = Array.prototype.slice.call(blocks);
		const term = inputRef?.current?.value.toLowerCase();

		if (term !== "") {
			// eslint-disable-next-line
			blockArray.map(function (block) {
				const str = block.dataset.title.toLowerCase();
				const found = str.search(term);
				if (found !== -1) {
					block.style.display = "flex";
				} else {
					block.style.display = "none";
				}
			});
		} else {
			// eslint-disable-next-line
			blockArray.map(function (block) {
				block.style.display = "flex";
			});
		}
	}

	return (
		<div className="gbm-search">
			<label className="offscreen" htmlFor="gbm-search">
				{__("Filter Blocks", "block-manager")}
			</label>
			<input
				type="text"
				id="gbm-search"
				placeholder={__("Filter Blocks", "block-manager")}
				onKeyUp={() => handleSearch()}
				ref={inputRef}
			/>
			<button type="button" onClick={() => handleSearch()}>
				<span className="offscreen">{__("Submit", "block-manager")}</span>
				<span className="dashicons dashicons-search"></span>
			</button>
		</div>
	);
}
