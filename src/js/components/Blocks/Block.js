import cn from "classnames";
import Icon from "../Global/Icon";
import Switch from "./Switch";

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
	const { icon, name } = data;
	console.log(name, data);

	const disabledClass = disabledBlocks.indexOf(name) !== -1 ? "disabled" : "";
	const isFiltered = filteredBlocks.indexOf(name) !== -1 ? true : false;
	const filteredClass = isFiltered ? "filtered" : "";

	/**
	 * Handle the click event for the block button.
	 *
	 * @param {MouseEvent} e The event.
	 */
	function click(e) {
		const target = e.currentTarget;
		if (target) {
			const id = target.dataset.id;
			if (!target.classList.contains("filtered")) {
				toggleBlock(target, id);
			} else {
				alert(gbm_localize.filtered_alert); // eslint-disable-line no-alert
				target.blur();
			}
		}
	}

	return (
		<button
			data-title={data.title}
			data-description={data.description}
			className={cn("item block-button", disabledClass, filteredClass)}
			data-id={name}
			data-category={data.category}
			onClick={(e) => click(e)}
			aria-label={gbm_localize.toggle}
			title={name}
			tabIndex={isFiltered ? -1 : null}
		>
			<div>
				<Icon icon={icon} />
			</div>
			{!!data.title && <p className="block-title">{data.title}</p>}
			{data.description && typeof data.description === "string" ? (
				<p className="block-desc">{data.description}</p>
			) : null}
			<code className="block-id">{name}</code>
			{!isFiltered && <Switch />}
		</button>
	);
}
export default Block;
