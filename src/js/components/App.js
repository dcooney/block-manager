import { useEffect, useState } from "@wordpress/element";
import getBlockData from "../functions/getBlockData";
import getCategoryData from "../functions/getCategoryData";
import Blocks from "./Blocks/Index";
import Categories from "./Categories/Index";

export default function App() {
	const [blocks] = useState(getBlockData());
	const [categories] = useState(getCategoryData());

	// Parse URL to get active plugin view.
	const url = window.location.href;
	const isCategory = url.includes("category-switcher") ? true : false;

	useEffect(() => {
		// Display total blocks in header.
		const totalDiv = document.querySelector("span.block-total");
		if (totalDiv) {
			totalDiv.innerHTML = blocks?.length || 0;
		}
	}, [blocks]);

	// useEffect(() => {
	// 	setBlocks(getBlockData());
	// 	setCategories(getCategoryData());
	// }, []);

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
