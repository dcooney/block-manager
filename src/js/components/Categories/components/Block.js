import { __ } from "@wordpress/i18n";
import Icon from "../../Global/Icon";
import cn from "classnames";

/**
 * Render the Block component for a category listing.
 *
 * @param {Object}   props            The component properties.
 * @param {Object}   props.data       Data for an individual block.
 * @param {Array}    props.categories Array of block categories.
 * @param {Function} props.callback   Function to call after category change.
 * @param {Array}    props.callback   Array of filtered cateogries.
 * @return {Element}                  The Block component.
 */
export default function Block({
	data,
	categories,
	callback,
	filteredCategories,
	blockCategories,
}) {
	const { name, icon, title, category } = data;

	// Is this block filtered?
	const isfiltered = filteredCategories?.find((cat) => cat.block === name);

	return (
		<div
			data-title={title}
			className={cn("item", "gbm-category", isfiltered ? "filtered" : null)}
			data-id={name}
		>
			<div className="gbm-category-wrap">
				<Icon icon={icon} />
				<p title={name}>
					{title}
					<span>{name}</span>
				</p>
			</div>
			<div className="gbm-category-wrap category-switch">
				<label htmlFor={`select-${name}`} className="offscreen">
					{__("Update block category", "block-manager")}
				</label>
				<select
					defaultValue={category}
					onChange={(e) => callback(name, e)}
					id={`select-${name}`}
					disabled={isfiltered}
				>
					{!!categories?.length &&
						categories.map((cat, index) => {
							return (
								<option
									key={`cat-${cat.slug}-${index}`}
									value={cat.slug}
								>
									{cat.title}
								</option>
							);
						})}
				</select>
			</div>
			<div className="gbm-cat-status">
				<i className="fa fa-check" aria-hidden="true"></i>
				<span className="offscreen">
					{__("Category Updated", "block-manager")}
				</span>
			</div>
		</div>
	);
}
