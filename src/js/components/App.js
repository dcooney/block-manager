import React, { useState } from 'react';
import getBlockData from '../functions/getBlockData';
import getCategoryData from '../functions/getCategoryData';
import Blocks from './Blocks/Index';
import Categories from './Categories/Index';
const { addFilter } = wp.hooks;

function App() {
	const [wpBlocks] = useState(getBlockData());
	const [wpCategories] = useState(getCategoryData());

	// Parse URL to get active plugin view.
	const url = window.location.href;
	const isCategory = url.includes('category-switcher') ? true : false;

	// Display total blocks in header
	let totalDiv = document.querySelector('span.block-total');
	if (totalDiv) {
		totalDiv.innerHTML = wpBlocks.length;
	}

	return (
		<React.Fragment>
			{isCategory ? <Categories wpBlocks={wpBlocks} wpCategories={wpCategories} /> : <Blocks wpBlocks={wpBlocks} wpCategories={wpCategories} />}
		</React.Fragment>
	);
}
export default App;
