import { __ } from "@wordpress/i18n";
import Icon from "../../Global/Icon";

/**
 * Render the Block component for a category listing.
 *
 * @param {Object}   props              The component properties.
 * @param {Object}   props.data         Data for an individual block.
 * @param {Array}    props.wpCategories Array of block categories.
 * @param {Function} props.callback     Function to call after category change.
 * @return {Element}                    The Block component.
 */
export default function Block({ data, wpCategories, callback }) {
	const { name, icon, title, category, description } = data;

	return (
		<div data-title={title} className="item" data-id={name}>
			<div className="item--wrap">
				<Icon icon={icon} />
				<div className="block-info--wrap">
					<div className="block-info--details">
						<span className="block-info block-info--title">{title}</span>
						{description && typeof description === "string" ? (
							<span
								className="block-info block-info--desc"
								title={description}
							>
								{description}
							</span>
						) : null}
						<span className="block-info block-info--id">{name}</span>
					</div>
					<div className="block-info--action">
						<label>
							<span className="offscreen">
								{gbm_localize.cat_switch}
							</span>
							<select
								defaultValue={category}
								onChange={(e) => callback(name, e)}
							>
								{!!wpCategories?.length &&
									wpCategories.map((cat, index) => {
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
						</label>
					</div>
				</div>
			</div>
			<div className="loading-cover"></div>
			<div className="gbm-cat-status">
				<i className="fa fa-check" aria-hidden="true"></i>{" "}
				{__("Category Updated", "block-manager")}
			</div>
		</div>
	);
}
