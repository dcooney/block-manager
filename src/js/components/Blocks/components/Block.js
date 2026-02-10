import { BlockIcon } from '@wordpress/block-editor';
import { useRef } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import cn from 'classnames';
import Switch from '../../Global/Switch';

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
	console.log(data);

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
				__('%s Variation:', 'block-manager'),
				prefix
			)
		: `${title}:`;

	return (
		<div
			ref={blockRef}
			tabIndex={filtered ? -1 : null}
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
			title={`${intro} ${description}`}
		>
			<Switch
				active={disabled || filtered}
				onClick={(e) => click(e)}
				title={__('Toggle block activation', 'block-manager')}
			/>
			<div>
				<BlockIcon icon={icon} />
				{!!title && (
					<p className="block-title">
						{!!prefix && (
							<em className="block-title--prefix">{prefix}/</em>
						)}
						{title}
					</p>
				)}
			</div>

			<button className={'gbm-block-info'}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
					<path d="M80 48l288 0 0 170.9c15.2-5.4 31.3-8.9 48-10.3L416 0 32 0 32 512 276 512c-10.5-14.6-19-30.7-25.1-48L80 464 80 48zm48 80l0 48 192 0 0-48-192 0zm0 96l0 48 128 0 0-48-128 0zm0 96l0 48 96 0 0-48-96 0zM432 544a144 144 0 1 0 0-288 144 144 0 1 0 0 288zm15.3-224l0 32-32 0 0-32 32 0zm1.2 64l0 64 15.5 0 0 32-15.5 0-.5 0c-24 0-40 0-48 0l0-32 16 0 .5 0 0-32-.5 0-16 0 0-32c23.9 0 40.8 0 48.5 0z" />
				</svg>
			</button>
		</div>
	);
}
export default Block;
