import { registerCoreBlocks } from '@wordpress/block-library';
import { getBlockTypes } from '@wordpress/blocks';
import { getBlockCategoryData, getBlocksData } from '../functions/blocks';
import getCategoryData from '../functions/getCategoryData';
import Blocks from './Blocks/Blocks';
import Categories from './Categories/Categories';
import Patterns from './Patterns/Patterns';

export default function App() {
	const { filteredCategoriesAll = [] } = gbm_localize;

	registerCoreBlocks();
	const blocks = getBlockTypes();
	const categories = getCategoryData();

	// Parse URL to get current view.
	const url = window?.location?.href;

	let type = 'blocks';
	type = url.includes('category-switcher') ? 'categories' : type;
	type = url.includes('patterns') ? 'patterns' : type;

	function Display() {
		switch (type) {
			case 'patterns':
				return <Patterns />;
			case 'categories':
				return (
					<Categories
						wpBlocks={getBlockCategoryData(blocks)}
						wpCategories={categories}
					/>
				);
			default:
				return (
					<Blocks
						wpBlocks={getBlocksData(blocks, filteredCategoriesAll)}
						wpCategories={categories}
					/>
				);
		}
	}

	return <Display />;
}
