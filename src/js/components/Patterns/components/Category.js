import { __ } from '@wordpress/i18n';
import Pattern from './Pattern';

/**
 * Render the Category component for the pattern listing.
 *
 * @param {Object}   props                  The component properties.
 * @param {Object}   props.data             Data for an individual block.
 * @param {Function} props.togglePattern    Function to toggle the activation of a pattern.
 * @param {Array}    props.disabledPatterns Array of disabled patterns.
 * @param {Array}    props.filteredPatterns Array of filtered patterns.
 * @param {Function} props.callback         Function to call after category change.
 * @return {Element}                        The Category component.
 */
export default function Category({
	data,
	togglePattern,
	disabledPatterns = [],
	filteredPatterns = [],
	callback,
}) {
	const { patterns = [], label = '' } = data;

	if (!patterns?.length) {
		return null;
	}

	// Get total patterns in category.
	const total = patterns?.length;

	// Combine disabled and filtered blocks.
	const allDisabled = [...disabledPatterns, ...filteredPatterns];

	// Count disabled patterns.
	// Loop all blocks in the category and find match.
	const count =
		allDisabled?.length &&
		patterns.filter((pattern) => allDisabled.includes(pattern?.name))
			?.length;

	// Set toggle button attributes
	const switchClass =
		count === total ? 'gbm-block-switch disabled' : 'gbm-block-switch';
	const state = count === total ? 'inactive' : 'active';

	return (
		<div
			key={data?.slug}
			id={`block-${data?.slug}`}
			className="gbm-block-group"
			tabIndex={-1}
		>
			<div className="gbm-block-list-heading">
				<h3>{label}</h3>
				<button
					className={switchClass}
					data-state={state}
					onClick={callback}
					aria-label={__(
						'Toggle all blocks in this category',
						'block-manager'
					)}
					title={__(
						'Toggle all blocks in this category',
						'block-manager'
					)}
				>
					<div className="gbm-block-switch--wrap">
						<span></span>
					</div>
				</button>
			</div>
			<div className="gbm-block-list">
				{patterns.map((pattern) => {
					return (
						<Pattern
							key={pattern?.name}
							data={pattern}
							togglePattern={togglePattern}
							disabledPatterns={disabledPatterns}
							filteredPatterns={filteredPatterns}
						/>
					);
				})}
			</div>
		</div>
	);
}
