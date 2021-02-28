import cn from 'classnames';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Icon from '../Global/Icon';

function Block({ data, wpCategories, changeCategory }) {
	let icon = '';
	let type = 'dashicon';
	const id = data.name;
	const blockCat = data.category;

	// Convert Icon.
	if (data.icon && data.icon.src) {
		if (data.icon.src.type) {
			type = 'react';
			icon = ReactDOMServer.renderToStaticMarkup(data.icon.src);
		} else {
			icon = data.icon.src;
		}
	}

	return (
		<div data-title={data.title} role="button" className={cn('item')} data-id={id}>
			<div className="item--wrap">
				<Icon src={icon} type={type} />
				<div className="block-info--wrap">
					<div className="block-info--details">
						<span className="block-info block-info--title">{data.title}</span>
						<span className="block-info block-info--desc" title={data.description}>
							{data.description}
						</span>
						<span className="block-info block-info--id">{id}</span>
					</div>
					<div className="block-info--action">
						<label>
							<span className="offscreen">{gbm_localize.cat_switch}</span>
							<select defaultValue={blockCat} onChange={(e) => changeCategory(id, e)}>
								{!!wpCategories &&
									wpCategories.map((cat, index) => {
										return (
											<option key={`cat-${cat.slug}-${index}`} value={cat.slug}>
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
				<i className="fa fa-check" aria-hidden="true"></i> {gbm_localize.updated}
			</div>
		</div>
	);
}
export default Block;
