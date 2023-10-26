import { __ } from '@wordpress/i18n';
import { variationBlocks } from '../../../constants';
import Block from './Block';

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

	// Get total blocks in category, include variations if displayed.
	const total = blocks?.length;

	// Combine disabled and filtered blocks.
	const allDisabled = [...disabledBlocks, ...filteredBlocks];

	// Count disabled blocks.
	// Loop all blocks in the category and find match.
	const count =
		allDisabled?.length &&
		blocks.filter((block) => allDisabled.includes(block?.name))?.length;

	// Set toggle button attributes
	const switchClass =
		count === total ? 'gbm-block-switch disabled' : 'gbm-block-switch';
	const state = count === total ? 'inactive' : 'active';

	return (
		<div
			key={info?.slug}
			id={`block-${info?.slug}`}
			className="gbm-block-group"
			data-total-blocks={total}
			tabIndex={-1}
		>
			<div className="gbm-block-list-heading">
				<h3>
					{title}
					<span>
						[{total - count}/{total}]
					</span>
				</h3>
				<button
					className={switchClass}
					data-state={state}
					onClick={callback}
					title={__(
						'Toggle all blocks in this category',
						'block-manager'
					)}
				>
					<div className="gbm-block-switch--wrap">
						<span>
							<span className="offscreen">
								{__(
									'Toggle all blocks in this category',
									'block-manager'
								)}
							</span>
						</span>
					</div>
				</button>
			</div>
			<div className="gbm-block-list">
				{!!blocks?.length &&
					blocks.map((block, index) => (
						<>
							<Block
								key={index + block?.name}
								data={block}
								toggleBlock={toggleBlock}
								disabledBlocks={disabledBlocks}
								filteredBlocks={filteredBlocks}
							/>
							{!!block?.variations?.length &&
								variationBlocks.includes(block?.name) &&
								block?.variations.map((variation) => {
									const variationData = {
										...variation,
										name: `variation;${block?.name};${variation?.name}`,
										prefix: block?.title,
										variation: block?.name,
									};
									return (
										<Block
											key={index + variation.name}
											data={variationData}
											toggleBlock={toggleBlock}
											disabledBlocks={disabledBlocks}
											filteredBlocks={filteredBlocks}
										/>
									);
								})}
						</>
					))}
			</div>
		</div>
	);
}
