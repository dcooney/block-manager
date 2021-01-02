import React, { useEffect, useState, useCallback } from "react";
import Block from "./Block";

function Category({ data, toggleBlock, categoryClickHandler }) {
	const title = data.info.title;
	const blocks = data.blocks;

	let disabledBlocks = gbm_localize.disabledBlocks;
	if (typeof disabledBlocks === "object") {
		// Convert `disabledBlocks` to array if required.
		disabledBlocks = Object.keys(disabledBlocks).map(
			(i) => disabledBlocks[i]
		);
	}

	// Count disabled blocks
	let disabledBlockCount = 0;
	if (disabledBlocks.length) {
		[...blocks].forEach(function (block) {
			var a = disabledBlocks.indexOf(block.name);
			if (a !== -1) {
				disabledBlockCount++;
			}
		});
	}

	// Set toggle button attributes
	let switchClass =
		disabledBlockCount === blocks.length
			? "gbm-block-switch disabled"
			: "gbm-block-switch";
	let switchState =
		disabledBlockCount === blocks.length ? "inactive" : "active";

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
					role="button"
					className={switchClass}
					data-state={switchState}
					onClick={categoryClickHandler}
					aria-label={gbm_localize.toggle_all}
					title={gbm_localize.toggle_all}
				>
					<div className="gbm-block-switch--wrap">
						<span>
							<span className="offscreen">
								{gbm_localize.toggle_all}
							</span>
						</span>
					</div>
				</button>
			</div>
			<div className="gbm-block-list">
				{blocks &&
					blocks.length &&
					blocks.map((block, index) => (
						<Block
							key={block.name}
							key={index + block.name}
							data={block}
							toggleBlock={toggleBlock}
							disabledBlocks={disabledBlocks}
						/>
					))}
				<div className="loader"></div>
			</div>
		</div>
	);
}
export default Category;
