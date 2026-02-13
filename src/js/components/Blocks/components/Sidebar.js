import { Fragment, useEffect, useRef, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import scrollToElement from '../../../functions/scrollToElement';
import DisabledSVG from '../../Global/DisabledSVG';
import Search from '../../Global/Search';

/**
 * Render the Sidebar for Block Manager.
 *
 * @param {Object}   props          The component props.
 * @param {Array}    props.blocks   Array of WP Blocks.
 * @param {number}   props.active   Total number of active blocks.
 * @param {number}   props.disabled Total number of disabled blocks.
 * @param {number}   props.filtered Total number of filtered blocks.
 * @param {Function} props.search   The search handler function.
 * @return {Element}                The Sidebar component.
 */
export default function Sidebar({
	blocks,
	active,
	disabled,
	filtered,
	search,
}) {
	const activeRef = useRef(null);
	const disabledRef = useRef(null);
	const mountedRef = useRef(false);

	const [activeTotal, setActiveTotal] = useState(active);
	const [disabledTotal, setDisabledTotal] = useState(disabled);

	/**
	 * Block total update animation.
	 *
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

	// Update the active blocks.
	useEffect(() => {
		change(activeRef.current, active, setActiveTotal);
	}, [active]);

	// Update the disabled blocks.
	useEffect(() => {
		setTimeout(() => {
			change(disabledRef.current, disabled, setDisabledTotal);
		}, 125);
	}, [disabled]);

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
						title={`${activeTotal} ${__(
							'Active Blocks & Block Variations',
							'block-manager'
						)}`}
					>
						<div>
							<span>
								<strong ref={activeRef} data-prev={activeTotal}>
									{activeTotal}
								</strong>
							</span>
						</div>
						{__('Active', 'block-manager')}
					</div>
					<div
						className="gbm-legend gbm-legend--disabled"
						title={
							disabledTotal === 1
								? `1 ${__('Disabled Block', 'block-manager')}`
								: `${disabledTotal} ${__(
										'Disabled Blocks',
										'block-manager'
									)}`
						}
					>
						<div>
							<span>
								<strong
									ref={disabledRef}
									data-prev={disabledTotal}
								>
									{disabledTotal}
								</strong>
							</span>
							<DisabledSVG className="disabled" />
						</div>
						{__('Disabled', 'block-manager')}
					</div>
					{!!filtered && (
						<div
							className="gbm-legend gbm-legend--filtered"
							title={
								filtered === 1
									? `1 ${__(
											'Filtered Block',
											'block-manager'
										)}`
									: `${filtered} ${__(
											'Filtered Blocks',
											'block-manager'
										)}`
							}
						>
							<div>
								<span>
									<strong>{filtered}</strong>
								</span>
								<DisabledSVG className="disabled" />
							</div>
							{__('Filtered', 'block-manager')}
						</div>
					)}
				</div>
			</div>
			<div className="gbm-cta">
				<h3>{__('Categories', 'block-manager')}</h3>
				<div className="gbm-cta-wrap">
					{!!blocks?.length &&
						blocks.map((category) => (
							<Fragment key={category?.info?.slug}>
								{!!category?.blocks?.length && (
									<button
										type="button"
										className="gbm-toc"
										onClick={() =>
											scrollToElement(
												`block-${category?.info?.slug}`
											)
										}
									>
										{category?.info?.title}
									</button>
								)}
							</Fragment>
						))}
				</div>
			</div>
		</div>
	);
}
