import { useEffect, useRef, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import axios from 'axios';
import { exportHook } from '../../functions/export';
import { categoryOffsetCount } from '../../functions/helpers';
import Export from '../Global/Export';
import ExportModal from '../Global/ExportModal';
import Loader from '../Global/Loader';
import Notifications from '../Global/Notifications';
import Reset from '../Global/Reset';
import SearchResults from '../Global/SearchResults';
import Block from './components/Block';
import Sidebar from './components/Sidebar';

/**
 * Render the Categories component.
 *
 * @param {Object} props              The component properties.
 * @param {Array}  props.wpBlocks     Array of WP blocks.
 * @param {Array}  props.wpCategories Array of WP block categories
 * @return {Element}                  The Categories component.
 */
export default function Categories({ wpBlocks, wpCategories }) {
	const {
		blockCategories: block_cats = [],
		filteredCategories: filtered_cats = [],
		disabledBlocksAll: disabled_blocks = [],
	} = gbm_localize;

	const resetButtonRef = useRef(null);
	const exportModalRef = useRef();
	const exportButtonRef = useRef();

	const [search, setSearch] = useState({ term: '', results: 0 });
	const [loading, setLoading] = useState(true);
	const [notifications, setNotifications] = useState([]);
	const [categories] = useState(wpCategories);

	const [blocks] = useState(wpBlocks);
	const [blockCategories, setBlockCategories] = useState(block_cats);
	const [filteredCategories] = useState(filtered_cats);

	// Create array containing only active block names.
	const block_names = blocks.map((i) => i.name);

	/**
	 * Change the block category.
	 *
	 * @param {string}      block  The block ID.
	 * @param {string}      title  The block title.
	 * @param {HTMLElement} target The select HTML element.
	 * @since 1.0
	 */
	function updateCategory(block, title, target) {
		const category = target.value;
		const original = target.dataset.original;
		const type = category === original ? 'remove' : 'add';

		// Send API request.
		axios({
			method: 'POST',
			url: gbm_localize.root + 'gbm/category_update/',
			headers: {
				'X-WP-Nonce': gbm_localize.nonce,
				'Content-Type': 'application/json',
			},
			data: {
				type,
				block,
				title,
				category,
			},
		})
			.then(function (res) {
				const { data, status } = res;
				if (data && status === 200 && data?.categories) {
					// Success: update state for categories and blocks.
					setBlockCategories([...data?.categories]);
					setNotifications((prev) => [
						...prev,
						{
							id: Date.now(),
							msg: data?.msg,
							success: true,
						},
					]);
				} else {
					console.warn(
						__(
							'An unknown error has occurred and the block category could not be updated',
							'block-manager'
						)
					);
				}
			})
			.catch(function (error) {
				console.warn(error);
			});
	}

	/**
	 * Reset categories to default.
	 */
	function resetCategories() {
		resetButtonRef?.current?.classList.add('spin'); // Loading state.
		axios({
			method: 'POST',
			url: gbm_localize.root + 'gbm/category_reset/',
			headers: {
				'X-WP-Nonce': gbm_localize.nonce,
				'Content-Type': 'application/json',
			},
		})
			.then(function () {
				window?.location?.reload();
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
		const theBlocks = document.querySelectorAll(
			'.gbm-blocks .gbm-block-list .item'
		);

		if (term !== '') {
			let count = 0;
			[...theBlocks].forEach(function (block) {
				const str = block.dataset.title.toLowerCase();
				const found = str.search(term.toLowerCase());
				if (found !== -1) {
					block.removeAttribute('style');
					count++;
				} else {
					block.style.display = 'none';
				}
			});
			setSearch({ term, results: count });
		} else {
			setSearch({ term, results: false });
			[...theBlocks].forEach(function (block) {
				block.removeAttribute('style');
			});
		}
	}

	/**
	 * Clear the block search.
	 */
	function clearSearch() {
		searchHandler('');
		setSearch({ term: '', results: false });
		const input = document.querySelector('#gbm-search');
		if (input) {
			input.value = '';
		}
	}

	// On Load
	useEffect(() => {
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
		<>
			{loading ? (
				<Loader callback={setLoading} />
			) : (
				<>
					<header className="gbm-block-header">
						<div className="gbm-block-header--title">
							<h2>{__('Block Categories', 'block-manager')}</h2>
							<p>
								{__(
									'Organize the Block Inserter by modifying the category of each block.',
									'block-manager'
								)}
							</p>
						</div>
						<div className="gbm-options">
							<div>
								<Reset
									ref={resetButtonRef}
									callback={resetCategories}
									total={blockCategories?.length}
									msg={__(
										'Are you sure you want to reset the modified block categories?',
										'block-manager'
									)}
									title={__(
										'Clear all modified block categories',
										'block-manager'
									)}
								/>
								<Export
									ref={exportButtonRef}
									callback={() =>
										exportHook(
											exportModalRef?.current,
											'categories'
										)
									}
									total={blockCategories?.length}
									title={__(
										'Export an array of updated blocks categories as a WordPress hook',
										'block-manager'
									)}
								/>
							</div>
						</div>
					</header>
					<div className="gbm-block-list-wrapper categories">
						<Sidebar
							search={searchHandler}
							total={blocks?.length}
							updated={blockCategories?.length}
							filtered={filteredCategories?.length}
							updatedBlocksOffset={categoryOffsetCount(
								blockCategories,
								disabled_blocks,
								block_names
							)}
							filteredBlocksOffset={categoryOffsetCount(
								filteredCategories,
								disabled_blocks,
								block_names
							)}
						/>
						<div className="gbm-blocks">
							<div className="gbm-block-group">
								<SearchResults
									data={search}
									callback={clearSearch}
								/>
								<div className="gbm-block-list categories">
									<>
										{!!blocks?.length &&
											blocks.map((block) => {
												return (
													<Block
														key={`${block?.name}-${block?.category}`}
														callback={
															updateCategory
														}
														categories={categories}
														data={block}
														filteredCategories={
															filteredCategories
														}
														blockCategories={
															blockCategories
														}
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
							'Add the the following code to your functions.php to update block categories at the theme level.',
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
