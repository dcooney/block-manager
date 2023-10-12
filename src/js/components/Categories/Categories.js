import { useEffect, useRef, useState } from "@wordpress/element";
import { __, sprintf } from "@wordpress/i18n";
import axios from "axios";
import Block from "./components/Block";
import Reset from "./components/Reset";
import Sidebar from "./components/Sidebar";
import getBlockData from "../../functions/blocks";
import getCategoryData from "../../functions/getCategoryData";

/**
 * Render the Categories component.
 *
 * @param {Object} props              The component properties.
 * @param {Array}  props.wpBlocks     Array of WP blocks.
 * @param {Array}  props.wpCategories Array of WP block categories
 * @return {Element}                  The Categories component.
 */
export default function Categories({ wpBlocks, wpCategories }) {
	const resetButtonRef = useRef(null);
	const [loading, setLoading] = useState(true);
	const [categories] = useState(wpCategories);
	const [blocks, setBlocks] = useState(wpBlocks);
	const [filteredCategories, setFilteredCategories] = useState(
		gbm_localize?.filteredCategories || [],
	);

	const heading = sprintf(
		// translators: %s: The number of blocks.
		__(
			"Update the categories of your %s blocks with the category switcher.",
			"block-manager",
		),
		`<span>${blocks?.length}</span>`,
	);

	/**
	 * Change the block category.
	 *
	 * @param {string} id     The block ID.
	 * @param {Object} select The select element.
	 * @since 1.0
	 */
	function switchCategory(id, select) {
		if (!id || !select) {
			return false;
		}
		const value = select.target.value;
		const element = select.target.closest(".item");
		let status = "";

		if (element) {
			element.classList.add("loading");
			status = element.querySelector(".gbm-cat-status");
		}

		// Send API request.
		axios({
			method: "POST",
			url: gbm_localize.root + "gbm/category_switch/",
			headers: {
				"X-WP-Nonce": gbm_localize.nonce,
				"Content-Type": "application/json",
			},
			data: {
				data: JSON.stringify({ block: id, cat: value }),
			},
		})
			.then(function (res) {
				const response = res.data;
				if (response && res.status === 200) {
					// Success
					if (element) {
						element.classList.remove("loading");
						if (status) {
							status.classList.add("active");
							setTimeout(function () {
								status.classList.remove("active");
							}, 2500);
						}
					}
				} else {
					console.warn("an error has occurred");
					if (element) {
						element.classList.remove("loading");
					}
				}
			})
			.catch(function (error) {
				console.warn(error);
				if (element) {
					element.classList.remove("loading");
				}
			});
	}

	/**
	 * Reset categories to default.
	 */
	function resetCategories() {
		resetButtonRef?.current?.classList.add("spin"); // Loading state.
		axios({
			method: "POST",
			url: gbm_localize.root + "gbm/category_reset/",
			headers: {
				"X-WP-Nonce": gbm_localize.nonce,
				"Content-Type": "application/json",
			},
		})
			.then(function () {
				setFilteredCategories([]);
				setTimeout(function () {
					setBlocks(getBlockData([]));
					resetButtonRef?.current?.classList.remove("spin");
				}, 250);
			})
			.catch(function (error) {
				console.warn(error);
				resetButtonRef?.current?.classList.remove("spin");
			});
	}

	// On Load
	useEffect(() => {
		setTimeout(function () {
			setLoading(false);
		}, 250);

		// Export settings.
		document.addEventListener(
			"keyup",
			function (e) {
				if (e.key === "Escape") {
					closeExport();
				}
			},
			false,
		);
		return () => {};
	}, []);

	return (
		<>
			{loading ? (
				<span className="gbm-loader">
					{__("Fetching Blocks and Categories", "block-manager")}…
				</span>
			) : (
				<div className="gbm-block-list-wrapper categories">
					<Sidebar />
					<div className="gbm-blocks">
						<div className="gbm-options">
							<p
								className="gbm-heading"
								dangerouslySetInnerHTML={{ __html: heading }}
							/>
							<div>
								<Reset
									ref={resetButtonRef}
									callback={resetCategories}
									total={filteredCategories?.length}
								/>
							</div>
						</div>
						<div className="gbm-block-group">
							<div className="gbm-block-list categories">
								{!!categories?.length &&
									categories.map((cat, index) => (
										<section key={index}>
											<h3>{cat?.title}</h3>
										</section>
									))}
								<>
									{!!blocks?.length &&
										blocks.map((block) => {
											console.log(block);
											return (
												<Block
													key={`${block?.name}-${block?.category}`}
													callback={switchCategory}
													categories={categories}
													data={block}
												/>
											);
										})}
								</>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
