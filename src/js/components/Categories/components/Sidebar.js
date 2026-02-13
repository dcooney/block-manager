import { useEffect, useRef, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import DisabledSVG from '../../Global/DisabledSVG';
import Search from '../../Global/Search';

/**
 * Render the Sidebar for Category Manager.
 *
 * @param {Object}   props                      The component properties.
 * @param {number}   props.total                Total blocks.
 * @param {number}   props.updated              Updated block categories.
 * @param {number}   props.filtered             Total number of filtered block categories.
 * @param {number}   props.updatedBlocksOffset  Total number of disabled blocks to offset the count.
 * @param {number}   props.filteredBlocksOffset Total number of filtered blocks to offset the count.
 * @return {Element}                            The Sidebar component.
 */
export default function Sidebar({
	total,
	updated,
	filtered,
	updatedBlocksOffset,
	filteredBlocksOffset,
}) {
	const updatedRef = useRef(null);
	const mountedRef = useRef(false);
	const [updatedTotal, setUpdatedTotal] = useState(
		updated - updatedBlocksOffset
	);

	/**
	 * Block total update animation.
	 * @param {Element}  ref      The ref element.
	 * @param {number}   value    The current value.
	 * @param {Function} callback The callback function.
	 */
	function change(ref, value, callback) {
		if (!mountedRef?.current || !ref) {
			return;
		}
		const prev = ref?.dataset?.prev;
		const direction = parseInt(prev) > value ? 'up' : 'down';
		ref?.classList?.add(`slide-${direction}`);

		setTimeout(() => {
			callback(value);
			ref?.classList?.add(`slide-${direction}-done`);
			ref?.classList?.remove(`slide-${direction}`);
			setTimeout(() => {
				ref?.classList?.remove(`slide-${direction}-done`);
			}, 75);
		}, 200);
	}

	// Update the updated blocks.
	useEffect(() => {
		change(
			updatedRef.current,
			updated - updatedBlocksOffset,
			setUpdatedTotal
		);
	}, [updated]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		setTimeout(() => {
			mountedRef.current = true;
		}, 500);
	}, []);

	return (
		<div className="gbm-sidebar">
			<div
				className="gbm-cta gbm-cta-block-legend"
				aria-label={__('Current Block Status', 'block-manager')}
			>
				<div className="gbm-cta-wrap">
					<div
						className="gbm-legend gbm-legend--total"
						title={`${total} ${__(
							'Total Blocks',
							'block-manager'
						)}`}
					>
						<div>
							<span>
								<strong>{total}</strong>
							</span>
						</div>
						{__('Blocks', 'block-manager')}
					</div>
					<div
						className="gbm-legend gbm-legend--updated"
						title={
							updatedTotal === 1
								? `1 ${__(
										'Updated Block Category',
										'block-manager'
									)}`
								: `${updatedTotal} ${__(
										'Updated Block Categories',
										'block-manager'
									)}`
						}
					>
						<div>
							<span>
								<strong ref={updatedRef} data-prev={updatedRef}>
									{updatedTotal}
								</strong>
							</span>
							<DisabledSVG className="disabled" />
						</div>
						{__('Updated', 'block-manager')}
					</div>
					{!!filtered && (
						<div
							className="gbm-legend gbm-legend--filtered"
							title={
								filtered === 1
									? `1 ${__(
											'Filtered Block Category',
											'block-manager'
										)}`
									: `${filtered} ${__(
											'Filtered Block Categories',
											'block-manager'
										)}`
							}
						>
							<div>
								<span>
									<strong>
										{filtered - filteredBlocksOffset}
									</strong>
								</span>
								<DisabledSVG className="disabled" />
							</div>
							{__('Filtered', 'block-manager')}
						</div>
					)}
				</div>
			</div>
			<div className="gbm-cta">
				<h3>{__("What's This?", 'block-manager')}</h3>
				<div className="gbm-cta-wrap">
					<p>
						{__(
							'The Block Categories feature allows you to customize and update block categories for all blocks in the editor.',
							'block-manager'
						)}
					</p>
					<p style={{ marginBottom: '0px' }}>
						{__(
							'This makes it easy to organize blocks into categories that are more meaningful and relevant to your workflow.',
							'block-manager'
						)}
					</p>
				</div>
			</div>
		</div>
	);
}
