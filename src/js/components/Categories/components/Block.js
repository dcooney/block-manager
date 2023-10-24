import { __ } from '@wordpress/i18n';
import Icon from '../../Global/Icon';
import cn from 'classnames';
import { useRef, useState } from '@wordpress/element';

/**
 * Render the Block component for a category listing.
 *
 * @param {Object}   props                    The component properties.
 * @param {Object}   props.data               Data for an individual block.
 * @param {Array}    props.categories         Array of block categories.
 * @param {Function} props.callback           Function to call after category change.
 * @param {Array}    props.filteredCategories Array of filtered cateogries.
 * @param {Array}    props.blockCategories    Array of updated cateogries.
 * @return {Element}                          The Block component.
 */
export default function Block({
	data,
	categories,
	callback,
	filteredCategories,
	blockCategories,
}) {
	const selectRef = useRef(null);
	const { name, icon, title, category, orginalCategory } = data;
	const [activeCategory, setActiveCategory] = useState(category);

	// Is this block category filtered?
	const filtered = filteredCategories?.find((cat) => cat.block === name);

	// Is this block category updated?
	const updated = blockCategories?.find((cat) => cat.block === name);

	function handler() {
		callback(name, title, selectRef?.current);
		setActiveCategory(selectRef?.current?.value);
	}

	return (
		<div
			data-title={title}
			className={cn(
				'item',
				'gbm-category',
				updated ? 'updated' : null,
				filtered ? 'filtered' : null
			)}
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
					{__('Update block category', 'block-manager')}
				</label>
				<select
					defaultValue={category}
					onChange={() => handler()}
					id={`select-${name}`}
					data-original={orginalCategory}
					disabled={filtered}
					ref={selectRef}
				>
					{!!categories?.length &&
						categories.map((cat, index) => {
							return (
								<option
									key={`${cat.slug}-${index}`}
									value={cat.slug}
								>
									{cat.title}
									{orginalCategory !== activeCategory &&
									orginalCategory === cat.slug
										? ` - [${__(
												'Default',
												'block-manager'
										  )}]`
										: null}
								</option>
							);
						})}
				</select>
			</div>
		</div>
	);
}
