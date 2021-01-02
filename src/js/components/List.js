import React, { useEffect, useState, useCallback } from "react";
import Category from "./Category";
import Nav from "./Nav";
import axios from "axios";

function List({ props }) {
	let [blocks, setBlocks] = useState({});
	let [totalBlocks, setTotalBlocks] = useState(0);

	/**
	 * categoryClickHandler
	 * Category level block toggle click
	 *
	 * @since 1.0
	 */
	const categoryClickHandler = (e) => {
		let target = e.currentTarget;
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
	 * bulkProcess
	 * Toggle all blocks in a category
	 *
	 * @since 1.0
	 */
	const bulkProcess = (target, type = "enable") => {
		let blocksWrapper = target.parentNode.parentNode.querySelector(
			".gbm-block-list"
		);
		let blocks = blocksWrapper.querySelectorAll(".gbm-block-list .item");

		if (!blocks) {
			return false;
		}

		blocksWrapper.classList.add("loading");

		let blockArray = Array.prototype.map.call(blocks, function (block) {
			return block.dataset.id;
		});

		if (blockArray.length) {
			let url = gbm_localize.root + "gbm/bulk_process/";
			let data = { blocks: blockArray, type: type };

			// API Request
			axios({
				method: "POST",
				url: url,
				headers: {
					"X-WP-Nonce": gbm_localize.nonce,
					"Content-Type": "application/json",
				},
				data: {
					data: JSON.stringify(data),
				},
			})
				.then(function (res) {
					let response = res.data;

					if (response && res.status == 200) {
						// Success

						[...blocks].forEach(function (block) {
							if (type === "enable") {
								block.classList.remove("disabled");
							} else {
								block.classList.add("disabled");
							}
						});
						blocksWrapper.classList.remove("loading");
						setCategoryStatus(blocks[0]);
					} else {
						// Error
						console.log("an error has occurred");
						blocksWrapper.classList.remove("loading");
					}
				})
				.catch(function (error) {
					console.log(error);
					blocksWrapper.classList.remove("loading");
				});
		} else {
			alert("No blocks found");
		}
	};

	/**
	 * toggleBlock
	 * Toggle the status of a block
	 *
	 * @since 1.0
	 */
	const toggleBlock = (element, block) => {
		if (!element || element.classList.contains("loading")) {
			// Exit if loading
			return false;
		}

		element.classList.add("loading");
		let url = gbm_localize.root + "gbm/toggle/";
		let type = element.classList.contains("disabled") ? "enable" : "disable";
		let data = { block: block, type: type };

		// API Request
		axios({
			method: "POST",
			url: url,
			headers: {
				"X-WP-Nonce": gbm_localize.nonce,
				"Content-Type": "application/json",
			},
			data: {
				data: JSON.stringify(data),
			},
		})
			.then(function (res) {
				let response = res.data;

				if (response && res.status == 200) {
					// Success
					if (response.success) {
						if (type === "disable") {
							element.classList.add("disabled");
						} else {
							element.classList.remove("disabled");
						}
						element.classList.remove("loading");
						setCategoryStatus(element);
					}
				} else {
					// Error
					console.log("an error has occurred");
					element.classList.remove("loading");
				}
			})
			.catch(function (error) {
				// Error
				console.log(error);
				element.classList.remove("loading");
			});
	};

	/**
	 * setCategoryStatus
	 * Set the status indicator and button states for each category
	 *
	 * @since 1.0
	 */
	const setCategoryStatus = (element) => {
		if (!element) {
			return false;
		}
		let parent = element.parentNode.parentNode;
		let totalBlocks = parent.dataset.totalBlocks;
		let feedback = parent.querySelector("h3 span");
		let toggleBtn = parent.querySelector(".gbm-block-switch");
		let items = parent.querySelectorAll(".gbm-block-list .item");

		if (items) {
			let blockArr = Array.prototype.slice.call(items);
			let disabledBlocks = blockArr.filter((block) => {
				return block.classList.contains("disabled");
			});

			feedback.innerHTML = `(${
				totalBlocks - disabledBlocks.length
			}/${totalBlocks})`;

			// If disabled === total items, toggle the switch
			if (disabledBlocks.length === items.length) {
				toggleBtn.classList.add("disabled");
				toggleBtn.dataset.state = "inactive";
			} else {
				toggleBtn.classList.remove("disabled");
				toggleBtn.dataset.state = "active";
			}
		}
	};

	/**
	 * Window onLoad
	 * Get all WP Blocks
	 *
	 * @since 1.0
	 */
	const onLoad = (e) => {
		wp.blockLibrary.registerCoreBlocks();
		const wpBlocks = wp.blocks.getBlockTypes();
		if (wpBlocks) {
			// Sort blocks by name
			wpBlocks.sort(function (a, b) {
				const textA = a.name.toUpperCase();
				const textB = b.name.toUpperCase();
				return textA < textB ? -1 : textA > textB ? 1 : 0;
			});

			// Filter `core/missing` & `core/reusable` blocks
			let blocks = wpBlocks.filter((block) => {
				return block.name !== "core/missing" && block.name !== "core/block";
			});

			setTotalBlocks(blocks.length); // Set state

			// Get unique block categories
			let categories = wp.blocks.getCategories();

			// Filter categories for `reusable`
			categories = categories.filter((cat) => {
				return cat.slug !== "reusable";
			});

			// Sort categories by name
			categories.sort(function (a, b) {
				const textA = a.title.toUpperCase();
				const textB = b.title.toUpperCase();
				return textA < textB ? -1 : textA > textB ? 1 : 0;
			});

			// Filter blocks by categories
			let blockArray = [];
			categories.forEach(function (cat) {
				let filtered = blocks.filter(function (block) {
					return block.category === cat.slug;
				});

				if ("embed" === cat.slug) {
					// core/embed block only
					const embedBlock = blocks.filter(function (block) {
						return block.category === cat.slug;
					});
					// Get `variations`.
					let variations = embedBlock[0] ? embedBlock[0].variations : [];
					let modVariations = variations.map((item) => {
						item.name = "variation;core/embed;" + item.name;
						return item;
					});

					// Add to block array.
					filtered.push(modVariations);

					// Concat array to top level.
					filtered = [].concat.apply([], filtered);
				}

				let obj = {
					info: cat,
					blocks: filtered,
				};
				if (filtered.length > 0) {
					blockArray.push(obj);
				}
			});
			blockArray;
			setBlocks(blockArray); // Set state
		}
	};

	// Close plugins display
	const otherPluginsClick = (e) => {
		let otherPluginsDiv = document.getElementById("gbm-other-plugins");
		if (!otherPluginsDiv) {
			return false;
		}
		if (otherPluginsDiv.style.display === "block") {
			otherPluginsDiv.style.display = "none";
		} else {
			otherPluginsDiv.style.display = "block";
		}
		let container = document.getElementById("gbm-container");
		container.focus();
	};

	useEffect(() => {
		// Display total blocks in header
		if (totalBlocks !== 0) {
			let totalDiv = document.querySelector("span.block-total");
			let wrapperDiv = document.querySelector(".gbm-block-list-wrapper");
			totalDiv.innerHTML = totalBlocks;
			wrapperDiv.classList.add("loaded");
		}
	}, [totalBlocks]);

	// On Load
	useEffect(() => {
		onLoad();

		let otherPluginsBtn = document.getElementById("otherPlugins");
		let otherPluginsClose = document.getElementById("otherPluginsClose");
		if (otherPluginsBtn) {
			otherPluginsBtn.addEventListener("click", otherPluginsClick);
			otherPluginsClose.addEventListener("click", otherPluginsClick);
		}
	}, []);

	return (
		<div className="gbm-block-list-wrapper">
			<Nav blocks={blocks} />
			<div className="gbm-blocks">
				<span className="global-loader loading">
					{gbm_localize.loading}
				</span>
				{blocks &&
					blocks.length &&
					blocks.map((category, index) => (
						<Category
							key={category.info.slug}
							data={category}
							toggleBlock={toggleBlock}
							categoryClickHandler={categoryClickHandler}
						/>
					))}
			</div>
		</div>
	);
}
export default List;
