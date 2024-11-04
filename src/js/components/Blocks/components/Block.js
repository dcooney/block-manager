import { useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import cn from 'classnames';
import Icon from '../../Global/Icon';
import DisabledSVG from '../../Global/DisabledSVG';

/**
 * Render a Block component to display an individual block.
 *
 * @param {Object}   props                The component props.
 * @param {Object}   props.data           Array of WP blocks.
 * @param {Array}    props.disabledBlocks Array of disabled blocks.
 * @param {Array}    props.filteredBlocks Array of filtered blocks.
 * @param {Function} props.toggleBlock    Function to toggle the activation of a block.
 * @return {Element}                      The Block component.
 */
function Block({ data, disabledBlocks, filteredBlocks, toggleBlock }) {
	const {
		icon,
		name,
		title,
		description,
		category,
		variation = '',
		prefix,
	} = data;
	const blockRef = useRef(null);

	const disabled = disabledBlocks?.indexOf(name) !== -1;
	const disabledClass = disabled ? 'disabled' : '';

	const filtered = filteredBlocks?.indexOf(name) !== -1;
	const filteredClass = filtered ? 'filtered' : '';

	/**
	 * Handle the click event for the block button.
	 */
	function click() {
		const target = blockRef?.current;
		if (target) {
			const { id, title: blockTitle } = target.dataset;
			if (!target.classList.contains('filtered')) {
				toggleBlock(target, id, blockTitle);
				target.blur();
			} else {
				// eslint-disable-next-line no-alert
				alert(
					__(
						"This block has been disabled via the 'gbm_disabled_blocks' hook and cannot be activated using the Block Manager interface.",
						'block-manager'
					)
				);
				target.blur();
			}
		}
	}

	const intro = variation
		? sprintf(
				// translators: Parent block slug.
				__('%s Block Variation:', 'block-manager'),
				prefix
		  )
		: `${title}:`;

	return (
		<button
			ref={blockRef}
			tabIndex={filtered ? -1 : null}
			aria-label={__('Toggle Block Activation', 'block-manager')}
			data-title={title}
			data-description={description}
			className={cn(
				'item block-button',
				disabledClass,
				filteredClass,
				variation ? 'is-variation' : null
			)}
			data-id={name}
			data-category={category}
			onClick={(e) => click(e)}
			title={`${intro} ${description}`}
		>
			<div>
				<Icon icon={icon} />
				{!!title && (
					<p className="block-title">
						{!!prefix && (
							<em className="block-title--prefix">{prefix}/</em>
						)}
						{title}
					</p>
				)}
			</div>
			<DisabledSVG className={disabled ? disabledClass : filteredClass} />
		</button>
	);
}
export default Block;
