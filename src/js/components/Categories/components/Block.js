import { __ } from "@wordpress/i18n";
import Icon from "../../Global/Icon";

/**
 * Render the Block component for a category listing.
 *
 * @param {Object}   props            The component properties.
 * @param {Object}   props.data       Data for an individual block.
 * @param {Array}    props.categories Array of block categories.
 * @param {Function} props.callback   Function to call after category change.
 * @return {Element}                  The Block component.
 */
export default function Block({ data, categories, callback }) {
	const { name, icon, title, category } = data;
	return (
		<div data-title={title} className="item gbm-category" data-id={name}>
			<div className="gbm-category-wrap">
				<Icon icon={icon} />
				<p>
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
