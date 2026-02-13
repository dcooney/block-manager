import { BlockIcon } from '@wordpress/block-editor';
import { useRef } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import cn from 'classnames';
import DisabledSVG from '../../Global/DisabledSVG';

/**
 * Render a Block component to display an individual block.
 *
 * @param {Object}   props                The component props.
 * @param {Object}   props.data           Array of WP blocks.
 * @param {Array}    props.disabledBlocks Array of disabled blocks.
 * @param {Array}    props.filteredBlocks Array of filtered blocks.
 * @param {Function} props.toggleBlock    Function to toggle the activation of a block.
 * @param {Function} props.onInfoClick    Function to handle info click.
 * @return {Element}                      The Block component.
 */
function Block({
	data,
	disabledBlocks,
	filteredBlocks,
	toggleBlock,
	onInfoClick,
}) {
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

	const active = !disabled && !filtered;

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
		<div className="block-button--wrapper">
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
			>
				{active ? (
					<div className="item-state">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 448 512"
						>
							<path d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z" />
						</svg>
					</div>
				) : null}
				<div>
					<BlockIcon icon={icon} />
					{!!title && (
						<p className="block-title">
							{!!prefix && (
								<em className="block-title--prefix">
									{prefix}/
								</em>
							)}
							{title}
						</p>
					)}
				</div>
				<DisabledSVG
					className={disabled ? disabledClass : filteredClass}
				/>
			</button>
			<button
				className="block-button--info"
				onClick={(e) => {
					e.stopPropagation();
					if (onInfoClick) {
						onInfoClick(data);
					}
				}}
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
					<path d="M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM216 336l24 0 0-64-48 0 0-48 96 0 0 112 32 0 0 48-128 0 0-48 24 0zm72-144l-64 0 0-64 64 0 0 64z" />
				</svg>
				<span className="offscreen">
					{__('View Details', 'block-manager')}
				</span>
			</button>
		</div>
	);
}
export default Block;
