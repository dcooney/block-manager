import React from 'react';
import Icon from '../Global/Icon';
import Switch from './Switch';
import cn from 'classnames';
import ReactDOMServer from 'react-dom/server';

function Block({ data, toggleBlock, disabledBlocks, filteredBlocks }) {
	let icon = '';
	let type = 'dashicon';
	let id = data.name;
	const disabledClass = disabledBlocks.indexOf(id) !== -1 ? 'disabled' : '';
	const isFiltered = filteredBlocks.indexOf(id) !== -1 ? true : false;
	const filteredClass = isFiltered ? 'filtered' : '';

	// Convert Icon.
	if (data.icon && data.icon.src) {
		if (data.icon.src.type) {
			type = 'react';
			icon = ReactDOMServer.renderToStaticMarkup(data.icon.src);
		} else {
			icon = data.icon.src;
		}
	}

	const clickHandler = (e) => {
		let target = e.currentTarget;
		if (target) {
			let id = target.dataset.id;
			if (!target.classList.contains('filtered')) {
				toggleBlock(target, id);
			} else {
				alert(gbm_localize.filtered_alert);
				target.blur();
			}
		}
	};

	return (
		<button
			data-title={data.title}
			data-description={data.description}
			role="button"
			className={cn('item', disabledClass, filteredClass)}
			data-id={id}
			data-category={data.category}
			onClick={clickHandler}
			aria-label={gbm_localize.toggle}
			title={id}
			tabIndex={isFiltered ? '-1' : ''}
		>
			<div className="item--wrap">
				<Icon src={icon} type={type} />
				<div className="block-info--wrap">
					<span className="block-info block-info--title">{data.title}</span>
					<span className="block-info block-info--desc" title={data.description}>
						{data.description}
					</span>
					<span className="block-info block-info--id">{id}</span>
				</div>
			</div>
			{!isFiltered && <Switch />}
		</button>
	);
}
export default Block;
