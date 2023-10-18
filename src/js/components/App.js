import { getBlockTypes } from "@wordpress/blocks";
import { getBlockCategoryData, getBlocksData } from "../functions/blocks";
import getCategoryData from "../functions/getCategoryData";
import Blocks from "./Blocks/Blocks";
import Categories from "./Categories/Categories";

export default function App() {
	const blocks = getBlockTypes();
	const categories = getCategoryData();

	// Parse URL to get current view.
	const url = window?.location?.href;
	const isCategory = url.includes("category-switcher") ? true : false;

	return (
		<>
			{isCategory ? (
				<Categories
					wpBlocks={getBlockCategoryData(blocks)}
					wpCategories={categories}
				/>
			) : (
				<Blocks
					wpBlocks={getBlocksData(
						blocks,
						gbm_localize?.filteredCategoriesAll,
					)}
					wpCategories={categories}
				/>
			)}
		</>
	);
}
