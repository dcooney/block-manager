import { useEffect, useRef, useState } from "@wordpress/element";
import { __, sprintf } from "@wordpress/i18n";
import axios from "axios";
import getBlockData from "../../functions/blocks";
import Block from "./components/Block";
import Reset from "../Global/Reset";
import Sidebar from "./components/Sidebar";
import Export from "../Global/Export";
import ExportModal from "../Global/ExportModal";
import { exportHook } from "../../functions/export";

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
	const exportModalRef = useRef();
	const exportButtonRef = useRef();

	const [loading, setLoading] = useState(true);
	const [categories] = useState(wpCategories);
	const [blocks, setBlocks] = useState(wpBlocks);
	const [filteredCategories, setFilteredCategories] = useState(
		gbm_localize?.filteredCategories || [],
	);

	const heading = sprintf(
		// translators: %s: The number of blocks.
		__(
			"Organize blocks by modifying the assigned category for each of your %s blocks.",
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
		const catStatus = element?.querySelector(".gbm-cat-status");

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
				const { data, status } = res;
				if (data && status === 200 && data?.categories) {
					catStatus?.classList?.add("active");
					// Success: update state for categories and blocks.
					setFilteredCategories([...data?.categories]);
					setTimeout(function () {
						catStatus?.classList?.remove("active");
						// Delay state for saving animation.
						setTimeout(function () {
							setBlocks(getBlockData(data?.categories));
						}, 150);
					}, 850);
				} else {
					console.warn(
						__(
							"An unknown error has occurred and the block category could not be updated",
							"block-manager",
						),
					);
				}
			})
			.catch(function (error) {
				console.warn(error);
				catStatus?.classList?.remove("active");
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
				window?.location?.reload();
			})
			.catch(function (error) {
				console.warn(error);
				resetButtonRef?.current?.classList.remove("spin");
			});
	}

	/**
	 * Export as PHP code.
	 */
	function exportCategories() {
		exportHook(exportModalRef?.current, "categories");
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
				<>
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
										msg={__(
											"Are you sure you want to reset your modified block categories?",
											"block-manager",
										)}
										title={__(
											"Clear all modified block categories",
											"block-manager",
										)}
									/>
									<Export
										ref={exportButtonRef}
										callback={exportCategories}
										total={filteredCategories?.length}
										title={__(
											"Export an array of updated blocks categories as a WordPress hook",
											"block-manager",
										)}
									/>
								</div>
							</div>
							<div className="gbm-block-group">
								<div className="gbm-block-list categories">
									<>
										{!!blocks?.length &&
											blocks.map((block) => {
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
					<ExportModal
						ref={exportModalRef}
						returnButtonRef={exportButtonRef}
						desc={__(
							"Add the the following code to your functions.php to update block categories at the theme level.",
							"block-manager",
						)}
					/>
				</>
			)}
		</>
	);
}
