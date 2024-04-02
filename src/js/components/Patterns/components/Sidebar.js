import { useEffect, useRef, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import scrollToElement from '../../../functions/scrollToElement';
import DisabledSVG from '../../Global/DisabledSVG';
import Search from '../../Global/Search';
import ToggleSwitch from './ToggleSwitch';

/**
 * Render the Sidebar for Block Manager.
 *
 * @param {Object}   props             The component props.
 * @param {Object}   props.categories  Object of pattern categories.
 * @param {number}   props.active      Total number of active blocks.
 * @param {number}   props.disabled    Total number of disabled blocks.
 * @param {number}   props.filtered    Total number of filtered blocks.
 * @param {Array}    props.patterns    Array of disabled patterns.
 * @param {Function} props.search      The search handler function.
 * @param {Function} props.setDisabled State handler for disabled patterns.
 * @return {Element}                   The Sidebar component.
 */
export default function Sidebar({
	categories,
	active,
	disabled,
	filtered,
	patterns,
	setDisabled,
	search,
}) {
	const { filteredPatterns = [] } = gbm_localize;
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
								? `1 ${__('Disabled Pattern', 'block-manager')}`
								: `${disabledTotal} ${__(
										'Disabled Patterns',
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
											'Filtered Pattern',
											'block-manager'
									  )}`
									: `${filtered} ${__(
											'Filtered Patterns',
											'block-manager'
									  )}`
							}
						>
							<div>
								<span>
									<strong>{filtered}</strong>
									<DisabledSVG className="filtered" />
								</span>
							</div>
							{__('Filtered', 'block-manager')}
						</div>
					)}
				</div>
			</div>
			<div className="gbm-cta">
				<h3>{__('Pattern Visibility', 'block-manager')}</h3>
				<div className="gbm-cta-wrap">
					<ToggleSwitch
						option="gbm/core-patterns"
						label={__('Core Patterns', 'block-manager')}
						desc={__(
							'Remove all core block patterns from the patterns selector.',
							'block-manager'
						)}
						active={!patterns.includes('gbm/core-patterns')}
						disabled={filteredPatterns.includes(
							'gbm/core-patterns'
						)}
						callback={setDisabled}
					/>
					<ToggleSwitch
						option="gbm/remote-patterns"
						label={__('Remote Patterns', 'block-manager')}
						desc={__(
							'Prevent users from searching for remote block patterns.',
							'block-manager'
						)}
						active={!patterns.includes('gbm/remote-patterns')}
						disabled={filteredPatterns.includes(
							'gbm/remote-patterns'
						)}
						callback={setDisabled}
					/>
					<ToggleSwitch
						option="gbm/uncategorized-patterns"
						label={__('Uncategorized Patterns', 'block-manager')}
						desc={__(
							'Remove all block patterns without an assigned category.',
							'block-manager'
						)}
						active={
							!patterns.includes('gbm/uncategorized-patterns')
						}
						disabled={filteredPatterns.includes(
							'gbm/uncategorized-patterns'
						)}
						callback={setDisabled}
					/>
				</div>
			</div>
			<div className="gbm-cta">
				<h3>{__('Categories', 'block-manager')}</h3>
				<div className="gbm-cta-wrap">
					{Object.keys(categories).map((category) => {
						return (
							<button
								key={categories[category]?.name}
								className="gbm-toc"
								type="button"
								onClick={() =>
									scrollToElement(
										`block-${categories[category]?.name}`
									)
								}
							>
								{categories[category]?.label}
							</button>
						);
					})}
					<Search
						callback={search}
						placeholder={__(
							'Search Block Patterns',
							'block-manager'
						)}
					/>
				</div>
			</div>
		</div>
	);
}
