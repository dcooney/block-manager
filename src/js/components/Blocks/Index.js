import { useEffect, useRef, useState } from "@wordpress/element";
import axios from "axios";
import Category from "./Category";
import Sidebar from "./Sidebar";

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
	const exportDivRef = useRef();
	const exportRef = useRef();
	const exportBtnRef = useRef();
	const copyRef = useRef();
	const [blocks, setBlocks] = useState([]);

	const disabledBlocks = gbm_localize?.disabledBlocks || 0;
	const filteredBlocks = gbm_localize?.filteredBlocks || 0;
	const has_disabled_blocks = disabledBlocks.length > filteredBlocks.length;

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
					const response = res.data;
					if (response && res.status === 200) {
						// Success

						[...allBlocks].forEach(function (block) {
							if (type === "enable") {
								block.classList.remove("disabled");
							} else {
								block.classList.add("disabled");
							}
						});
						blocksWrapper.classList.remove("loading");
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
			alert("No blocks found"); // eslint-disable-line no-alert
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

		const data = { block, type };

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
				const response = res.data;
				if (response && res?.status === 200) {
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
	 * Export blocks as PHP.
	 */
	const exportBlocks = () => {
		const url = gbm_localize.root + "gbm/export/";
		exportDivRef.current.classList.add("active");

		// Send API Request
		axios({
			method: "GET",
			url,
			headers: {
				"X-WP-Nonce": gbm_localize.nonce,
				"Content-Type": "application/json",
			},
		})
			.then(function (res) {
				if (res.status === 200 && res.data && res.data.success) {
					let blockReturn = res.data.blocks;
					blockReturn = blockReturn.replace(/\\/g, ""); // Replace `\`.
					blockReturn = blockReturn.replace(/"/g, "'"); // Replace `"`.
					blockReturn = blockReturn.replace(/,'/g, ", '"); // Replace `,'`.
					const results = `// functions.php<br/>add_filter( 'gbm_disabled_blocks', function() {<br/>&nbsp;&nbsp;&nbsp;return ${blockReturn};<br/>});`;
					exportRef.current.innerHTML = results;
					setTimeout(function () {
						exportDivRef.current.focus();
					}, 100);
				} else {
					console.warn("There was an error exporting disabled blocks.");
					exportDivRef.current.classList.remove("active");
				}
			})
			.catch(function (error) {
				// Error
				console.warn(error);
				exportDivRef.current.classList.remove("active");
			});
	};

	/**
	 * Copy export code to clipboard.
	 */
	const copyExport = () => {
		const range = document.createRange();
		range.selectNodeContents(exportRef.current);
		const sel = window?.getSelection(); //eslint-disable-line
		sel.removeAllRanges();
		sel.addRange(range);

		// Copy to clipboard
		document.execCommand("copy");
		copyRef.current.innerHTML = gbm_localize.copied;
		setTimeout(function () {
			copyRef.current.disabled = true;
		}, 500);
	};

	/**
	 * Close export modal.
	 */
	const closeExport = () => {
		exportDivRef.current.classList.remove("active");
		setTimeout(function () {
			exportBtnRef.current.focus();
			exportRef.current.innerHTML = gbm_localize.loading_export;
		}, 350);
	};

	/**
	 * Reset blocks to default state.
	 *
	 * @param {Event} e The event object.
	 */
	const resetBlocks = (e) => {
		const target = e.currentTarget;
		target.classList.add("spin");

		// API Request.
		const url = gbm_localize.root + "gbm/blocks_reset/";

		// Send request.
		axios({
			method: "POST",
			url,
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
				target.classList.remove("spin");
				target.classList.add("hidden");
			})
			.catch(function (error) {
				console.warn(error);
			});
	};

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
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div className="gbm-block-list-wrapper" ref={wrapperRef}>
			<Sidebar blocks={blocks} />
			<div className="gbm-blocks">
				<span className="global-loader loading">
					{gbm_localize.loading}...
				</span>
				<div className="gbm-options">
					{has_disabled_blocks && (
						<button
							type="button"
							className="resetblocks"
							onClick={(e) => resetBlocks(e)}
							title={gbm_localize.reset_blocks_title}
						>
							<span className="dashicons dashicons-update-alt"></span>
							{gbm_localize.reset_blocks}
						</button>
					)}
					<button
						type="button"
						className="export"
						ref={exportBtnRef}
						onClick={() => exportBlocks()}
						title={gbm_localize.export_title}
					>
						<span className="dashicons dashicons-database-export"></span>
						{gbm_localize.export}
					</button>
				</div>
				<div className="gbm-code-export" ref={exportDivRef} tabIndex="0">
					<div className="gbm-code-export--inner">
						<div>
							<p>{gbm_localize.export_intro}</p>
							<div>
								<button
									type="button"
									className="button button-primary"
									onClick={copyExport}
									ref={copyRef}
								>
									{gbm_localize.copy}
								</button>
								<button
									type="button"
									className="button"
									onClick={closeExport}
								>
									{gbm_localize.close}
								</button>
							</div>
						</div>
						<code
							id="gbm-export"
							ref={exportRef}
							contentEditable="true"
							suppressContentEditableWarning={true}
						>
							{gbm_localize.loading_export}
						</code>
					</div>
				</div>
				{!!blocks?.length &&
					blocks.map((category) => (
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
