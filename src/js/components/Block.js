import React, { useEffect, useState, useCallback } from "react";
import Icon from "./Icon"; 
import Switch from "./Switch"; 
import ReactDOM from "react-dom";
import ReactDOMServer from "react-dom/server";

function Block({ data, toggleBlock, disabledBlocks }) {		

	let icon = '';
	let type = 'dashicon';
	let id = data.name;
	
	if(data.icon && data.icon.src){		
		if(data.icon.src.type){
			type = 'react';
			icon = ReactDOMServer.renderToStaticMarkup(data.icon.src);			
		} else{			
			icon = data.icon.src;
		}
	}
	
	let disabledClass = '';
		Object.keys( disabledBlocks ).forEach( function( key ) {
			if (disabledBlocks[key] === id) {
				disabledClass = ' disabled';
			}
		});
	
	const clickHandler = e => {
		let target = e.currentTarget;
		if(target){
			let id = target.dataset.id;
			toggleBlock(target, id);
		}
	}
	
	return (
		<button data-title={data.title} data-description={data.description} role="button" className={'item' + disabledClass} data-id={id} data-category={data.category} onClick={clickHandler} aria-label={gbm_localize.toggle}>
			<div className="item--wrap">
				<Icon src={icon} type={type} />
				<div className="block-info--wrap">
					<span className="block-info block-info--title">{data.title}</span>
					<span className="block-info block-info--desc">{data.description}</span>
				</div>
			</div>
			<Switch />
		</button>	
	)	
}
export default Block;  