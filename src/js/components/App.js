import getBlockData from "../functions/blocks";
import getCategoryData from "../functions/getCategoryData";
import Blocks from "./Blocks/Blocks";
import Categories from "./Categories/Categories";

export default function App() {
	const blocks = getBlockData(gbm_localize?.filteredCategories);
	const categories = getCategoryData();

	// Parse URL to get current view.
	const url = window?.location?.href;
	const isCategory = url.includes("category-switcher") ? true : false;

	return (
		<>
			{isCategory ? (
				<Categories wpBlocks={blocks} wpCategories={categories} />
			) : (
				<Blocks wpBlocks={blocks} wpCategories={categories} />
			)}
		</>
	);
}
