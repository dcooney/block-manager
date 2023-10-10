import { useState } from "@wordpress/element";
import getBlockData from "../functions/getBlockData";
import getCategoryData from "../functions/getCategoryData";
import Categories from "./Categories/Categories";
import Blocks from "./Blocks/Blocks";

export default function App() {
	const [blocks] = useState(getBlockData());
	const [categories] = useState(getCategoryData());

	// Parse URL to get active plugin view.
	const url = window.location.href;
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
