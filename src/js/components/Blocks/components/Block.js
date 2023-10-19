import { useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import cn from 'classnames';
import Icon from '../../Global/Icon';
import DisabledSVG from './DisabledSVG';

/**
 * Render a Block component to display an individual block.
 *
 * @param {Object}   props                The component props.
 * @param {Object}   props.data           Array of WP blocks.
 * @param {Function} props.toggleBlock    Function to toggle the activation of a block.
 * @param {Array}    props.disabledBlocks Disabled blocks.
 * @param {Array}    props.filteredBlocks Filtered blocks.
 * @return {Element}                      The Block component.
 */
function Block({ data, toggleBlock, disabledBlocks, filteredBlocks }) {
	const { icon, name, title, description } = data;
	const blockRef = useRef(null);

	const disabled = disabledBlocks?.length
		? disabledBlocks.indexOf(name) !== -1
		: false;
	const disabledClass = disabled ? 'disabled' : '';

	const isFiltered =
		filteredBlocks?.length && filteredBlocks?.indexOf(name) !== -1
			? true
			: false;
	const filteredClass = isFiltered ? 'filtered' : '';

	/**
	 * Handle the click event for the block button.
	 */
	function click() {
		const target = blockRef?.current;
		if (target) {
			const id = target.dataset.id;
			if (!target.classList.contains('filtered')) {
				toggleBlock(target, id);
				target.blur();
			} else {
				// eslint-disable-next-line no-alert
				alert(
					__(
						"This block has been disabled globally via the 'gbm_disabled_blocks' hook and cannot be activated using the Block Manager interface.",
						'block-manager'
					)
				);
				target.blur();
			}
		}
	}

	return (
		<button
			ref={blockRef}
			tabIndex={isFiltered ? -1 : null}
			aria-label={__('Toggle Block Activation', 'block-manager')}
			data-title={title}
			data-description={description}
			className={cn('item block-button', disabledClass, filteredClass)}
			data-id={name}
			data-category={data.category}
			onClick={(e) => click(e)}
			title={`[${name}]: ${description}`}
		>
			<div>
				<Icon icon={icon} />
				{!!title && (
					<p className="block-title" title={title}>
						{title}
					</p>
				)}
			</div>
			<DisabledSVG className={disabled ? disabledClass : filteredClass} />
		</button>
	);
}
export default Block;
