import { useEffect, useRef, useState } from "@wordpress/element";
import { __, sprintf } from "@wordpress/i18n";
import axios from "axios";
import Category from "./Category";
import Sidebar from "./components/Sidebar";
import Reset from "./components/Reset";
import Export from "./components/Export";
import ExportModal from "./components/ExportModal";

/**
 * Render the Blocks component.
 *
 * @param {Object} props              The component props.
 * @param {Array}  props.wpBlocks     Array of WP blocks.
 * @param {Array}  props.wpCategories Array of WP block categories.
 * @return {Element}                  The Blocks component.
 */
export default function Blocks({ wpBlocks, wpCategories }) {
	const wrapperRef = useRef();
	const resetButtonRef = useRef();
	const exportModalRef = useRef();
	const exportButtonRef = useRef();

	const [loading, setLoading] = useState(false);
	const [blocks, setBlocks] = useState([]);
	const [disabledBlocks, setDisabledBlocks] = useState(
		gbm_localize?.disabledBlocks,
	);

	const heading = sprintf(
		// translators: %s: The number of blocks.
		__(
			"Manage the status of your %s blocks - disabled blocks will be globally removed from the block inserter.",
			"block-manager",
		),
		`<span>${wpBlocks?.length}</span>`,
	);

	/**
	 * Category level block toggle click.
	 *
	 * @param {Event} e The event object.
	 */
	const categoryClickHandler = (e) => {
		const target = e?.currentTarget;
		if (!target) {
			return false;
		}
		if (target.dataset.state === "active") {
			bulkProcess(target, "disable");
			target.classList.add("disabled");
			target.dataset.state = "inactive";
		} else {
			bulkProcess(target, "enable");
			target.classList.remove("disabled");
			target.dataset.state = "active";
		}
	};

	/**
	 * Toggle all blocks in a category.
	 *
	 * @param {Element} target The target element.
	 * @param {string}  type   The type of toggle.
	 */
	const bulkProcess = (target, type = "enable") => {
		const blocksWrapper =
			target?.parentNode?.parentNode?.querySelector(".gbm-block-list");

		const allBlocks = blocksWrapper?.querySelectorAll(
			".gbm-block-list .item:not(.filtered)",
		);

		if (!allBlocks) {
			return false;
		}

		blocksWrapper.classList.add("loading");
		const blockArray = Array.prototype.map.call(allBlocks, function (block) {
			return block.dataset.id;
		});

		if (blockArray?.length) {
			const url = gbm_localize.root + "gbm/bulk_process/";
			const data = { blocks: blockArray, type };

			// Send API Request
			axios({
				method: "POST",
				url,
				headers: {
					"X-WP-Nonce": gbm_localize.nonce,
					"Content-Type": "application/json",
				},
				data: {
					data: JSON.stringify(data),
				},
			})
				.then(function (res) {
					const { data = {}, status } = res;
					if (status === 200 && data.success) {
						// Success
						[...allBlocks].forEach(function (block) {
							if (type === "enable") {
								block.classList.remove("disabled");
							} else {
								block.classList.add("disabled");
							}
						});
						blocksWrapper.classList.remove("loading");
						setDisabledBlocks(data.disabled_blocks);
						setCategoryStatus(allBlocks[0]);
					} else {
						console.warn("an error has occurred");
						blocksWrapper.classList.remove("loading");
					}
				})
				.catch(function (error) {
					console.warn(error);
					blocksWrapper.classList.remove("loading");
				});
		} else {
			alert(__("No blocks found", "block-manager")); // eslint-disable-line no-alert
		}
	};

	/**
	 * Toggle the status of a block.
	 *
	 * @param {Element} element The target element.
	 * @param {Object}  block   Block data as an object.
	 */
	const toggleBlock = (element, block) => {
		if (!element || element.classList.contains("loading")) {
			// Exit if loading
			return false;
		}

		element.classList.add("loading");
		const url = gbm_localize.root + "gbm/toggle/";
		const type = element.classList.contains("disabled")
			? "enable"
			: "disable";

		// Send API Request
		axios({
			method: "POST",
			url,
			headers: {
				"X-WP-Nonce": gbm_localize.nonce,
				"Content-Type": "application/json",
			},
			data: {
				data: JSON.stringify({ block, type }),
			},
		})
			.then(function (res) {
				const { data, status } = res;
				if (data && status === 200) {
					if (data.success) {
						if (type === "disable") {
							element.classList.add("disabled");
						} else {
							element.classList.remove("disabled");
						}
						element.classList.remove("loading");
						setCategoryStatus(element);
					}
					setDisabledBlocks(data.disabled_blocks);
				} else {
					console.warn("an error has occurred");
					element.classList.remove("loading");
				}
			})
			.catch(function (error) {
				console.warn(error);
				element.classList.remove("loading");
			});
	};

	/**
	 * Set the status indicator and button states for each category.
	 *
	 * @param {Element} element The target element.
	 */
	const setCategoryStatus = (element) => {
		if (!element) {
			return false;
		}
		const parent = element.parentNode.parentNode;
		const totalBlocks = parent.dataset.totalBlocks;
		const feedback = parent.querySelector("h3 span");
		const toggleBtn = parent.querySelector(".gbm-block-switch");
		const items = parent.querySelectorAll(".gbm-block-list .item");

		if (items) {
			const blockArr = Array.prototype.slice.call(items);
			const disabledBlocksFiltered = blockArr.filter((block) => {
				return block.classList.contains("disabled");
			});

			feedback.innerHTML = `(${
				totalBlocks - disabledBlocksFiltered.length
			}/${totalBlocks})`;

			// If disabled === total items, toggle the switch
			if (disabledBlocksFiltered.length === items.length) {
				toggleBtn.classList.add("disabled");
				toggleBtn.dataset.state = "inactive";
			} else {
				toggleBtn.classList.remove("disabled");
				toggleBtn.dataset.state = "active";
			}
		}
	};

	/**
	 * Export blocks as PHP code.
	 */
	function exportBlocks() {
		exportModalRef?.current?.classList.add("active"); // Loading state.
		const code = exportModalRef?.current?.querySelector("#gbm-export");

		axios({
			method: "GET",
			url: gbm_localize.root + "gbm/export/",
			headers: {
				"X-WP-Nonce": gbm_localize.nonce,
				"Content-Type": "application/json",
			},
		})
			.then(function (res) {
				const { data, status } = res;
				if (status === 200 && data?.success && data?.blocks) {
					let blockReturn = data.blocks;
					blockReturn = blockReturn.replace(/\\/g, ""); // Replace `\`.
					blockReturn = blockReturn.replace(/"/g, "'"); // Replace `"`.
					blockReturn = blockReturn.replace(/,'/g, ", '"); // Replace `,'`.
					const results = `// functions.php<br/>add_filter( 'gbm_disabled_blocks', function() {<br/>&nbsp;&nbsp;&nbsp;return ${blockReturn};<br/>});`;
					code.innerHTML = results;
					setTimeout(function () {
						code.focus();
					}, 250);
				} else {
					console.warn(
						__(
							"There was an error exporting disabled blocks.",
							"block-manager",
						),
					);
					exportModalRef?.current?.classList.remove("active");
				}
			})
			.catch(function (error) {
				// Error
				console.warn(error);
				exportModalRef?.current?.classList.remove("active");
			});
	}

	/**
	 * Reset blocks to default state.
	 */
	function resetBlocks() {
		resetButtonRef?.current?.classList.add("spin"); // Loading state.

		axios({
			method: "POST",
			url: gbm_localize.root + "gbm/blocks_reset/",
			headers: {
				"X-WP-Nonce": gbm_localize.nonce,
				"Content-Type": "application/json",
			},
		})
			.then(function () {
				const items = document.querySelectorAll(
					".gbm-block-list .item.disabled:not(.filtered)",
				);
				if (items) {
					items.forEach((item) => {
						item.classList.remove("disabled");
					});
				}
				setDisabledBlocks([]);
				setTimeout(function () {
					resetButtonRef?.current?.classList.remove("spin");
				}, 250);
			})
			.catch(function (error) {
				console.warn(error);
				resetButtonRef?.current?.classList.remove("spin");
			});
	}

	/**
	 * Mutate Blocks on load.
	 *
	 * @since 1.0
	 */
	function onLoad() {
		if (wpBlocks && wpCategories) {
			// Filter blocks by categories.
			const blockArray = [];
			wpCategories.forEach(function (cat) {
				let filtered = wpBlocks.filter(function (block) {
					return block.category === cat.slug;
				});

				// Embed block.
				if ("embed" === cat.slug) {
					// core/embed block only
					const embedBlock = wpBlocks.filter(function (block) {
						return block.category === cat.slug;
					});
					// Get `variations`.
					const variations = embedBlock[0] ? embedBlock[0].variations : [];
					const modVariations = variations.map((item) => {
						item.name = "variation;core/embed;" + item.name;
						return item;
					});

					// Add to block array.
					filtered.push(modVariations);

					// Concat array to top level.
					filtered = [].concat.apply([], filtered);
				}

				if (filtered.length > 0) {
					blockArray.push({
						info: cat,
						blocks: filtered,
					});
				}
			});

			// Set blocks state.
			setBlocks(blockArray);
		}
	}

	// On Load
	useEffect(() => {
		onLoad();

		// Set Loaded.
		wrapperRef?.current.classList.add("loaded");
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<>
			<div className="gbm-block-list-wrapper" ref={wrapperRef}>
				<Sidebar blocks={blocks} />
				<div className="gbm-blocks">
					<span className="global-loader loading">
						{__("Loading", "block-manager")}…
					</span>
					<div className="gbm-options">
						<p
							className="gbm-heading"
							dangerouslySetInnerHTML={{ __html: heading }}
						/>
						<div>
							<Reset
								ref={resetButtonRef}
								callback={resetBlocks}
								total={disabledBlocks?.length}
							/>
							<Export
								ref={exportButtonRef}
								callback={exportBlocks}
								total={disabledBlocks?.length}
							/>
						</div>
					</div>
					{!!blocks?.length &&
						blocks.map((category) => (
							<Category
								key={category.info.slug}
								data={category}
								toggleBlock={toggleBlock}
								disabledBlocks={disabledBlocks}
								callback={categoryClickHandler}
							/>
						))}
				</div>
			</div>
			<ExportModal ref={exportModalRef} returnButtonRef={exportButtonRef} />
		</>
	);
}
