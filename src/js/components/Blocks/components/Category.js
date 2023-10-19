import { __ } from "@wordpress/i18n";
import Block from "./Block";

/**
 * Render the Category component for the category listing.
 *
 * @param {Object}   props                The component properties.
 * @param {Object}   props.data           Data for an individual block.
 * @param {Function} props.toggleBlock    Function to toggle the activation of a block.
 * @param {Array}    props.disabledBlocks Array of disabled blocks.
 * @param {Array}    props.filteredBlocks Array of filtered blocks.
 * @param {Function} props.callback       Function to call after category change.
 * @return {Element}                      The Category component.
 */
export default function Category({
	data,
	toggleBlock,
	disabledBlocks = [],
	filteredBlocks = [],
	callback,
}) {
	const { blocks = [], info } = data;
	const { title } = info;
	const total = blocks.length;

	// Combine disabled and filtered blocks.
	const allDisabledBlocks = [...disabledBlocks, ...filteredBlocks];

	// Count disabled blocks.
	// Loop all blocks in the category and find match.
	let count = 0;
	if (allDisabledBlocks.length) {
		blocks.forEach(function (block) {
			const found = allDisabledBlocks.indexOf(block?.name);
			if (found !== -1) {
				count++;
			}
		});
	}

	// Set toggle button attributes
	const switchClass =
		count === total ? "gbm-block-switch disabled" : "gbm-block-switch";
	const state = count === total ? "inactive" : "active";

	return (
		<div
			key={data.info.slug}
			id={"block-" + data.info.slug}
			className="gbm-block-group"
			data-total-blocks={data.blocks.length}
			tabIndex={-1}
		>
			<div className="gbm-block-list-heading">
				<h3>
					{title}
					<span>
						[{total - count}/{data.blocks.length}]
					</span>
				</h3>
				<button
					className={switchClass}
					data-state={state}
					onClick={callback}
					title={__("Toggle all blocks in this category", "block-manager")}
				>
					<div className="gbm-block-switch--wrap">
						<span>
							<span className="offscreen">
								{__(
									"Toggle all blocks in this category",
									"block-manager",
								)}
							</span>
						</span>
					</div>
				</button>
			</div>
			<div className="gbm-block-list">
				{!!blocks?.length &&
					blocks.map((block, index) => (
						<Block
							key={index + block.name}
							data={block}
							toggleBlock={toggleBlock}
							disabledBlocks={disabledBlocks}
							filteredBlocks={filteredBlocks}
						/>
					))}
			</div>
		</div>
	);
}
