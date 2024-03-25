import { Fragment, useEffect, useRef, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import axios from 'axios';
import { countDisabledBlocks } from '../../functions/blocks';
import { exportHook } from '../../functions/export';
import setCategoryStatus from '../../functions/setCategoryStatus';
import Export from '../Global/Export';
import ExportModal from '../Global/ExportModal';
import Loader from '../Global/Loader';
import Notifications from '../Global/Notifications';
import Reset from '../Global/Reset';
import SearchResults from '../Global/SearchResults';
import Category from './components/Category';
import Sidebar from './components/Sidebar';
import bulkProcess from '../../functions/bulkProcess';

/**
 * Render the Blocks component.
 *
 * @param {Object} props              The component props.
 * @param {Array}  props.wpBlocks     Array of WP blocks.
 * @param {Array}  props.wpCategories Array of WP block categories.
 * @return {Element}                  The Blocks component.
 */
export default function Blocks({ wpBlocks, wpCategories }) {
	const resetButtonRef = useRef();
	const exportModalRef = useRef();
	const exportButtonRef = useRef();

	const [search, setSearch] = useState({ term: '', results: 0 });
	const [loading, setLoading] = useState(true);
	const [notifications, setNotifications] = useState([]);
	const [blocks, setBlocks] = useState([]);

	const [disabledBlocks, setDisabled] = useState(
		gbm_localize?.disabledBlocks
	);
	const filteredBlocks = gbm_localize?.filteredBlocks || [];

	// Count the disabled & filtered blocks.
	const { disabledCount, filteredCount } = countDisabledBlocks(
		wpBlocks,
		disabledBlocks,
		filteredBlocks
	);

	/**
	 * Toggle the status of a block.
	 *
	 * @param {Element} element The target element.
	 * @param {string}  block   Block name.
	 * @param {string}  title   Block title.
	 */
	function toggleBlock(element, block, title) {
		if (!element || element.classList.contains('loading')) {
			return false;
		}

		element.classList.add('loading');
		const type = element.classList.contains('disabled')
			? 'enable'
			: 'disable';

		// Send API Request
		axios({
			method: 'POST',
			url: gbm_localize.root + 'gbm/toggle/',
			headers: {
				'X-WP-Nonce': gbm_localize.nonce,
				'Content-Type': 'application/json',
			},
			data: { block, title, type },
		})
			.then(function (res) {
				const { data = {}, status } = res;
				const { success = true } = data;
				if (data && status === 200) {
					if (success) {
						if (type === 'disable') {
							element.classList.add('disabled');
						} else {
							element.classList.remove('disabled');
						}
						element.classList.remove('loading');
						setCategoryStatus(element);
					}
					setDisabled(data.disabled_blocks);
					setNotifications((prev) => [
						...prev,
						{ id: Date.now(), msg: data?.msg, success },
					]);
				} else {
					element.classList.remove('loading');
					console.warn(__('An error has occurred', 'block-manager'));
				}
			})
			.catch(function (error) {
				element.classList.remove('loading');
				console.warn(error);
			});
	}

	/**
	 * Reset blocks to default state.
	 */
	function resetBlocks() {
		resetButtonRef?.current?.classList.add('spin'); // Loading state.

		axios({
			method: 'POST',
			url: gbm_localize.root + 'gbm/blocks_reset/',
			headers: {
				'X-WP-Nonce': gbm_localize.nonce,
				'Content-Type': 'application/json',
			},
		})
			.then(function (res) {
				const { data = {} } = res;
				const items = document.querySelectorAll(
					'.gbm-block-list .item.disabled:not(.filtered)'
				);
				if (items) {
					items.forEach((item) => {
						item.classList.remove('disabled');
					});
				}
				setDisabled([]);
				setNotifications((prev) => [
					...prev,
					{ id: Date.now(), msg: data?.msg, success: true },
				]);
				setTimeout(function () {
					resetButtonRef?.current?.classList.remove('spin');
				}, 250);
			})
			.catch(function (error) {
				console.warn(error);
				resetButtonRef?.current?.classList.remove('spin');
			});
	}

	/**
	 * Handle search.
	 *
	 * @param {string} term The search term.
	 */
	function searchHandler(term) {
		let count = 0;
		const groups = document.querySelectorAll('.gbm-block-group');
		if (!groups?.length) {
			return;
		}

		if (term !== '') {
			[...groups].forEach(function (group) {
				let total = 0;
				const theBlocks = group.querySelectorAll('.item');
				[...theBlocks].forEach(function (block, index) {
					const str = block.dataset.title.toLowerCase();
					const found = str.search(term.toLowerCase());

					// Show/hide blocks.
					if (found !== -1) {
						block.removeAttribute('style');
						total++;
						count++;
					} else {
						block.style.display = 'none';
					}

					// Show/hide entire group if no results.
					if (theBlocks.length === index + 1) {
						if (total === 0) {
							group.style.display = 'none';
						} else {
							group.removeAttribute('style');
						}
					}
				});
			});
			setSearch({ term, results: count });
		} else {
			setSearch({ term: '', results: 0 });
			[...groups].forEach(function (group) {
				group.removeAttribute('style');
				const theBlocks = group.querySelectorAll('.item');
				[...theBlocks].forEach(function (block) {
					block.removeAttribute('style');
				});
			});
		}
	}

	/**
	 * Clear the block search.
	 */
	function clearSearch() {
		searchHandler('');
		setSearch({ term: '', results: 0 });
		const input = document.querySelector('#gbm-search');
		if (input) {
			input.value = '';
		}
	}

	/**
	 * Mutate Blocks on load into categories and display block variations.
	 *
	 * @since 1.0
	 */
	function organizeBlocks() {
		if (!wpBlocks?.length || !wpCategories?.length) {
			return false;
		}

		// Loop block categories to build return data with category as parent.
		const data = wpCategories.map(function (category) {
			return {
				info: category,
				// Group blocks into categories.
				blocks: wpBlocks.filter(function (block) {
					return block.category === category.slug;
				}),
			};
		});

		// Set blocks state.
		setBlocks(data);
	}

	// On Load
	useEffect(() => {
		organizeBlocks();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<>
			{loading ? (
				<Loader callback={setLoading} />
			) : (
				<>
					<div className="gbm-block-list-wrapper">
						<Sidebar
							blocks={blocks}
							active={
								wpBlocks?.length - disabledCount - filteredCount
							}
							disabled={disabledCount}
							filtered={filteredCount}
							search={searchHandler}
						/>
						<div className="gbm-blocks">
							<div className="gbm-options">
								<p className="gbm-heading">
									{__(
										'Select blocks below to globally removed from the WordPress Block Inserter.',
										'block-manager'
									)}
								</p>
								<div>
									<Reset
										ref={resetButtonRef}
										callback={resetBlocks}
										total={disabledBlocks?.length}
										msg={__(
											'Are you sure you want to reset and activate all currently disabled blocks?',
											'block-manager'
										)}
										title={__(
											'Clear all disabled blocks',
											'block-manager'
										)}
									/>
									<Export
										ref={exportButtonRef}
										callback={() =>
											exportHook(
												exportModalRef?.current,
												'blocks'
											)
										}
										total={disabledBlocks?.length}
										title={__(
											'Export an array of disabled blocks as a WordPress hook',
											'block-manager'
										)}
									/>
								</div>
							</div>
							<SearchResults
								data={search}
								callback={clearSearch}
								className="blocks-render"
							/>
							{!!blocks?.length &&
								blocks.map((category) => (
									<Fragment key={category.info.slug}>
										{!!category?.blocks?.length && (
											<Category
												data={category}
												toggleBlock={toggleBlock}
												disabledBlocks={disabledBlocks}
												filteredBlocks={filteredBlocks}
												callback={(e) =>
													bulkProcess(
														e?.currentTarget,
														'blocks',
														setDisabled,
														setCategoryStatus,
														setNotifications
													)
												}
											/>
										)}
									</Fragment>
								))}
						</div>
					</div>
					<ExportModal
						ref={exportModalRef}
						returnButtonRef={exportButtonRef}
						desc={__(
							'Add the the following code to your functions.php to remove blocks at the theme level.',
							'block-manager'
						)}
					/>
					<Notifications
						notifications={notifications}
						setNotifications={setNotifications}
					/>
				</>
			)}
		</>
	);
}
