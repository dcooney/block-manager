import axios from 'axios';
import cn from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import Category from './Category';
import Sidebar from './Sidebar';

function Blocks({ wpBlocks, wpCategories }) {
	const exportDivRef = useRef();
	const exportRef = useRef();
	const exportBtnRef = useRef();
	const copyRef = useRef();
	const [blocks, setBlocks] = useState({});

	const initialView = localStorage && localStorage.getItem('gbm-view') ? localStorage.getItem('gbm-view') : 'grid';
	const [view, setView] = useState(initialView);

	const disabledBlocks = gbm_localize.disabledBlocks; // Localized var.
	const filteredBlocks = gbm_localize.filteredBlocks; // Localized var.
	const has_disabled_blocks = disabledBlocks.length > filteredBlocks.length;

	/**
	 * Category level block toggle click.
	 *
	 * @since 1.0
	 */
	const categoryClickHandler = (e) => {
		let target = e.currentTarget;
		if (!target) {
			return false;
		}
		if (target.dataset.state === 'active') {
			bulkProcess(target, 'disable');
			target.classList.add('disabled');
			target.dataset.state = 'inactive';
		} else {
			bulkProcess(target, 'enable');
			target.classList.remove('disabled');
			target.dataset.state = 'active';
		}
	};

	/**
	 * Toggle all blocks in a category.
	 *
	 * @since 1.0
	 */
	const bulkProcess = (target, type = 'enable') => {
		let blocksWrapper = target.parentNode.parentNode.querySelector('.gbm-block-list');
		let blocks = blocksWrapper.querySelectorAll('.gbm-block-list .item');

		if (!blocks) {
			return false;
		}

		blocksWrapper.classList.add('loading');

		let blockArray = Array.prototype.map.call(blocks, function (block) {
			return block.dataset.id;
		});

		if (blockArray.length) {
			let url = gbm_localize.root + 'gbm/bulk_process/';
			let data = { blocks: blockArray, type: type };

			// API Request
			axios({
				method: 'POST',
				url: url,
				headers: {
					'X-WP-Nonce': gbm_localize.nonce,
					'Content-Type': 'application/json',
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
							if (type === 'enable') {
								block.classList.remove('disabled');
							} else {
								block.classList.add('disabled');
							}
						});
						blocksWrapper.classList.remove('loading');
						setCategoryStatus(blocks[0]);
					} else {
						// Error
						console.log('an error has occurred');
						blocksWrapper.classList.remove('loading');
					}
				})
				.catch(function (error) {
					console.log(error);
					blocksWrapper.classList.remove('loading');
				});
		} else {
			alert('No blocks found');
		}
	};

	/**
	 * Toggle the status of a block.
	 *
	 * @since 1.0
	 */
	const toggleBlock = (element, block) => {
		if (!element || element.classList.contains('loading')) {
			// Exit if loading
			return false;
		}

		element.classList.add('loading');
		let url = gbm_localize.root + 'gbm/toggle/';
		let type = element.classList.contains('disabled') ? 'enable' : 'disable';
		let data = { block: block, type: type };

		// API Request
		axios({
			method: 'POST',
			url: url,
			headers: {
				'X-WP-Nonce': gbm_localize.nonce,
				'Content-Type': 'application/json',
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
						if (type === 'disable') {
							element.classList.add('disabled');
						} else {
							element.classList.remove('disabled');
						}
						element.classList.remove('loading');
						setCategoryStatus(element);
					}
				} else {
					// Error
					console.log('an error has occurred');
					element.classList.remove('loading');
				}
			})
			.catch(function (error) {
				// Error
				console.log(error);
				element.classList.remove('loading');
			});
	};

	/**
	 * Set the status indicator and button states for each category.
	 *
	 * @since 1.0
	 */
	const setCategoryStatus = (element) => {
		if (!element) {
			return false;
		}
		let parent = element.parentNode.parentNode;
		let totalBlocks = parent.dataset.totalBlocks;
		let feedback = parent.querySelector('h3 span');
		let toggleBtn = parent.querySelector('.gbm-block-switch');
		let items = parent.querySelectorAll('.gbm-block-list .item');

		if (items) {
			let blockArr = Array.prototype.slice.call(items);
			let disabledBlocks = blockArr.filter((block) => {
				return block.classList.contains('disabled');
			});

			feedback.innerHTML = `(${totalBlocks - disabledBlocks.length}/${totalBlocks})`;

			// If disabled === total items, toggle the switch
			if (disabledBlocks.length === items.length) {
				toggleBtn.classList.add('disabled');
				toggleBtn.dataset.state = 'inactive';
			} else {
				toggleBtn.classList.remove('disabled');
				toggleBtn.dataset.state = 'active';
			}
		}
	};

	/**
	 * Get all WP Blocks on load.
	 *
	 * @since 1.0
	 */
	const onLoad = () => {
		if (wpBlocks && wpCategories) {
			// Filter blocks by categories.
			let blockArray = [];
			wpCategories.forEach(function (cat) {
				let filtered = wpBlocks.filter(function (block) {
					return block.category === cat.slug;
				});

				if ('embed' === cat.slug) {
					// core/embed block only
					const embedBlock = wpBlocks.filter(function (block) {
						return block.category === cat.slug;
					});
					// Get `variations`.
					let variations = embedBlock[0] ? embedBlock[0].variations : [];
					let modVariations = variations.map((item) => {
						item.name = 'variation;core/embed;' + item.name;
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

			// Set blocks state.
			setBlocks(blockArray);
		}
	};

	// Change block view
	const changeView = (value) => {
		if (!value) {
			return false;
		}
		if (localStorage) {
			localStorage.setItem('gbm-view', value);
		}
		setView(value);
	};

	// Export blocks
	const exportBlocks = () => {
		let url = gbm_localize.root + 'gbm/export/';
		exportDivRef.current.classList.add('active');
		// API Request
		axios({
			method: 'GET',
			url: url,
			headers: {
				'X-WP-Nonce': gbm_localize.nonce,
				'Content-Type': 'application/json',
			},
		})
			.then(function (res) {
				if (res.status === 200 && res.data && res.data.success) {
					let blockReturn = res.data.blocks;
					blockReturn = blockReturn.replace(/\\/g, ''); // Replace `\`.
					blockReturn = blockReturn.replace(/"/g, "'"); // Replace `"`.
					blockReturn = blockReturn.replace(/,'/g, ", '"); // Replace `,'`.
					const results = `// functions.php<br/>add_filter( 'gbm_disabled_blocks', function() {<br/>&nbsp;&nbsp;&nbsp;return ${blockReturn}<br/>});`;
					exportRef.current.innerHTML = results;
					setTimeout(function () {
						exportDivRef.current.focus();
					}, 100);
				} else {
					console.warn('There was an error exporting disabled blocks.');
					exportDivRef.current.classList.remove('active');
				}
			})
			.catch(function (error) {
				// Error
				console.log(error);
				exportDivRef.current.classList.remove('active');
			});
	};

	// Copy to clipboard
	const copyExport = () => {
		// Create range
		const range = document.createRange();
		range.selectNodeContents(exportRef.current);
		const sel = window.getSelection();
		sel.removeAllRanges();
		sel.addRange(range);
		// Copy to clipboard
		document.execCommand('copy');
		copyRef.current.innerHTML = gbm_localize.copied;
		setTimeout(function () {
			copyRef.current.disabled = true;
		}, 500);
	};

	// Close Export modal.
	const closeExport = () => {
		exportDivRef.current.classList.remove('active');
		setTimeout(function () {
			exportBtnRef.current.focus();
			exportRef.current.innerHTML = gbm_localize.loading_export;
		}, 350);
	};

	/**
	 * Reset blocks to default.
	 */
	 const resetBlocks = (e) => {

		const target = e.currentTarget;
		target.classList.add('spin');

		// API Request.
		let url = gbm_localize.root + 'gbm/blocks_reset/';

		// Send request.
		axios({
			method: 'POST',
			url: url,
			headers: {
				'X-WP-Nonce': gbm_localize.nonce,
				'Content-Type': 'application/json',
			},
		})
			.then(function () {
				// Reload window.
				const items = document.querySelectorAll('.gbm-block-list .item.disabled:not(.filtered)');
				if(items){
					items.forEach((item) => {
						item.classList.remove('disabled');
					 });
				}
				target.classList.remove('spin');
				target.classList.add('hidden');
			})
			.catch(function (error) {
				// Error
				console.log(error);
			});
	};

	// On Load
	useEffect(() => {
		onLoad();

		// Set Loaded.
		let wrapperDiv = document.querySelector('.gbm-block-list-wrapper');
		wrapperDiv.classList.add('loaded');

		// Export settings.
		document.addEventListener(
			'keyup',
			function (e) {
				if (e.key === 'Escape') {
					closeExport();
				}
			},
			false
		);
		return () => {};
	}, []);

	return (
		<div className="gbm-block-list-wrapper">
			<Sidebar blocks={blocks} />
			<div className={cn('gbm-blocks', `gbm-view-${view}`)}>
				<span className="global-loader loading">{gbm_localize.loading}...</span>
				<div className="gbm-options">
					<div className="gbm-options--view">
						<button type="button" className={view === 'grid' ? 'active' : ''} disabled={view === 'grid'} onClick={() => changeView('grid')}>
							<span className="dashicons dashicons-grid-view"></span>
							{gbm_localize.grid}
						</button>
						<button type="button" className={view === 'list' ? 'active' : ''} disabled={view === 'list'} onClick={() => changeView('list')}>
							<span className="dashicons dashicons-list-view"></span>
							{gbm_localize.list}
						</button>
					</div>

					{has_disabled_blocks && (
						<button type="button" className="resetblocks" onClick={(e) => resetBlocks(e)} title={gbm_localize.reset_blocks_title}>
							<span className="dashicons dashicons-update-alt"></span>
							{gbm_localize.reset_blocks}
						</button>
					)}

					<button type="button" className="export" ref={exportBtnRef} onClick={() => exportBlocks()} title={gbm_localize.export_title}>
						<span className="dashicons dashicons-database-export"></span>
						{gbm_localize.export}
					</button>
				</div>
				<div className="gbm-code-export" ref={exportDivRef} tabIndex="0">
					<div className="gbm-code-export--inner">
						<div>
							<p>{gbm_localize.export_intro}</p>
							<div>
								<button type="button" className="button button-primary" onClick={copyExport} ref={copyRef}>
									{gbm_localize.copy}
								</button>
								<button type="button" className="button" onClick={closeExport}>
									{gbm_localize.close}
								</button>
							</div>
						</div>
						<code id="gbm-export" ref={exportRef} contentEditable="true" suppressContentEditableWarning={true}>
							{gbm_localize.loading_export}
						</code>
					</div>
				</div>
				{blocks &&
					blocks.length &&
					blocks.map((category) => (
						<Category key={category.info.slug} data={category} toggleBlock={toggleBlock} categoryClickHandler={categoryClickHandler} />
					))}
			</div>
		</div>
	);
}
export default Blocks;
