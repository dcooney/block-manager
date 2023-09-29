import { useRef } from "@wordpress/element";
import cn from "classnames";
import Icon from "../Global/Icon";

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
	const { icon, name, description } = data;
	const blockRef = useRef(null);
	const disabled = disabledBlocks.indexOf(name) !== -1;
	const disabledClass = disabled ? "disabled" : "";
	const isFiltered = filteredBlocks.indexOf(name) !== -1 ? true : false;
	const filteredClass = isFiltered ? "filtered" : "";

	/**
	 * Handle the click event for the block button.
	 */
	function click() {
		const target = blockRef?.current;
		if (target) {
			const id = target.dataset.id;
			if (!target.classList.contains("filtered")) {
				toggleBlock(target, id);
				target.blur();
			} else {
				alert(gbm_localize.filtered_alert); // eslint-disable-line no-alert
				target.blur();
			}
		}
	}

	return (
		<button
			ref={blockRef}
			tabIndex={isFiltered ? -1 : null}
			aria-label={
				disabled ? gbm_localize.enable_block : gbm_localize.disable_block
			}
			data-title={data.title}
			data-description={data.description}
			className={cn("item block-button", disabledClass, filteredClass)}
			data-id={name}
			data-category={data.category}
			onClick={(e) => click(e)}
			title={name}
		>
			<div>
				<Icon icon={icon} />
			</div>
			{!!data.title && <p className="block-title">{data.title}</p>}
			{!!description && typeof description === "string" && (
				<p className="block-desc">{description}</p>
			)}
			<svg className="disabled-svg">
				<line x1="0" y1="100%" x2="100%" y2="0" />
				<line x1="0" y1="0" x2="100%" y2="100%" />
			</svg>
		</button>
	);
}
export default Block;
