import { useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import cn from 'classnames';
import DisabledSVG from '../../Global/DisabledSVG';

/**
 * Render a Pattern component to display an individual block pattern.
 *
 * @param {Object}   props                The component props.
 * @param {Object}   props.data           Array of WP blocks.
 * @param {Array}    props.disabledBlocks Array of disabled blocks.
 * @param {Array}    props.filteredBlocks Array of filtered blocks.
 * @param {Function} props.togglePattern  Function to toggle the activation of a pattern.
 * @return {Element}                      The Pattern component.
 */
function Pattern({ data, disabledPatterns, filteredPatterns, togglePattern }) {
	const {
		source,
		name,
		title,
		content,
		categories = [],
		blockTypes = [],
	} = data;
	const patternRef = useRef(null);

	const disabled = disabledPatterns?.indexOf(name) !== -1;
	const disabledClass = disabled ? 'disabled' : '';

	const filtered = filteredPatterns?.indexOf(name) !== -1;
	const filteredClass = filtered ? 'filtered' : '';

	/**
	 * Handle the click event for the block button.
	 */
	function click() {
		const target = patternRef?.current;
		if (target) {
			if (!target.classList.contains('filtered')) {
				togglePattern(target, name, title);
				target.blur();
			} else {
				// eslint-disable-next-line no-alert
				alert(
					__(
						"This pattern has been disabled globally via the 'gbm_disabled_patterns' hook and cannot be activated using the Block Manager interface.",
						'block-manager'
					)
				);
				target.blur();
			}
		}
	}

	return (
		<>
			{!!title && (
				<button
					ref={patternRef}
					tabIndex={filtered ? -1 : null}
					aria-label={__(
						'Toggle Pattern Activation',
						'block-manager'
					)}
					data-title={title}
					data-id={name}
					onClick={(e) => click(e)}
					className={cn(
						'item block-button',
						disabledClass,
						filteredClass
					)}
				>
					<div>
						<p className="block-title">{title}</p>
					</div>
					<DisabledSVG
						className={disabled ? disabledClass : filteredClass}
					/>
				</button>
			)}
		</>
	);
}
export default Pattern;
