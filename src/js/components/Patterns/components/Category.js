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
	const { patterns = [], label = '', name: slug } = data;

	if (!patterns?.length) {
		return null;
	}

	// Get total patterns in category.
	const total = patterns?.length;

	// Combine disabled and filtered blocks.
	const disabled = [...disabledPatterns, ...filteredPatterns];

	// Count disabled patterns.
	// Loop all blocks in the category and find match.
	const count =
		disabled?.length &&
		patterns.filter((pattern) => disabled.includes(pattern?.name))?.length;

	return (
		<div
			key={`pattern-${slug}`}
			id={`block-${slug}`}
			className="gbm-block-group"
			tabIndex={-1}
		>
			<div className="gbm-block-list-heading">
				<h3>
					{label}
					<span>
						[{total - count}/{total}]
					</span>
				</h3>
				<button
					className={`gbm-block-switch${
						count === total ? ' disabled' : ''
					}`}
					data-state={count === total ? 'inactive' : 'active'}
					onClick={callback}
					aria-label={__(
						'Toggle all patterns in this category',
						'block-manager'
					)}
					title={__(
						'Toggle all patterns in this category',
						'block-manager'
					)}
				>
					<div className="gbm-block-switch--inner">
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
