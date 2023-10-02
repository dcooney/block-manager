import { __ } from "@wordpress/i18n";
import Block from "./Block";

/**
 * Render the Category component for the category listing.
 *
 * @param {Object}   props                      The component properties.
 * @param {Object}   props.data                 Data for an individual block.
 * @param {Function} props.toggleBlock          Function to toggle the activation of a block.
 * @param {Function} props.categoryClickHandler Function to call after category change.
 * @return {Element}                            The Category component.
 */
export default function Category({ data, toggleBlock, categoryClickHandler }) {
	const { blocks, info } = data;
	const { title } = info;

	let disabledBlocks = gbm_localize.disabledBlocks;
	const filteredBlocks = gbm_localize.filteredBlocks;

	if (typeof disabledBlocks === "object") {
		// Convert `disabledBlocks` to array if required.
		disabledBlocks = Object.keys(disabledBlocks).map(
			(i) => disabledBlocks[i],
		);
	}

	// Count disabled blocks
	let disabledBlockCount = 0;
	if (disabledBlocks.length) {
		[...blocks].forEach(function (block) {
			const found = disabledBlocks.indexOf(block.name);
			if (found !== -1) {
				disabledBlockCount++;
			}
		});
	}

	// Set toggle button attributes
	const switchClass =
		disabledBlockCount === blocks?.length
			? "gbm-block-switch disabled"
			: "gbm-block-switch";
	const switchState =
		disabledBlockCount === blocks?.length ? "inactive" : "active";

	return (
		<div
			key={data.info.slug}
			id={"block-" + data.info.slug}
			className="gbm-block-group"
			data-total-blocks={data.blocks.length}
		>
			<div className="gbm-block-list-controls">
				<h3>
					{title}{" "}
					<span>
						({data.blocks.length - disabledBlockCount}/
						{data.blocks.length})
					</span>
				</h3>
				<button
					className={switchClass}
					data-state={switchState}
					onClick={categoryClickHandler}
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
				<div className="loader"></div>
			</div>
		</div>
	);
}
