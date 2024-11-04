import { useRef, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import axios from 'axios';
import bulkProcess from '../../functions/bulkProcess';
import { exportHook } from '../../functions/export';
import setCategoryStatus from '../../functions/setCategoryStatus';
import Export from '../Global/Export';
import ExportModal from '../Global/ExportModal';
import Loader from '../Global/Loader';
import Notifications from '../Global/Notifications';
import Reset from '../Global/Reset';
import Category from './components/Category';
import Sidebar from './components/Sidebar';
import { countDisabledBlocks } from '../../functions/blocks';
import SearchResults from '../Global/SearchResults';

/**
 * Render the Patterns component.
 *
 * @return {Element} The Patterns component.
 */
export default function Patterns() {
	const { patterns: categories = [], filteredPatterns = [] } = gbm_localize;

	const allPatterns = [];
	// Loop categories to pluck all patterns.
	for (const value of Object.values(categories)) {
		allPatterns.push(...value?.patterns);
	}

	const [search, setSearch] = useState({ term: '', results: 0 });
	const [loading, setLoading] = useState(true);
	const [notifications, setNotifications] = useState([]);

	const [disabledPatterns, setDisabled] = useState(
		gbm_localize?.disabledPatterns
	);

	const resetButtonRef = useRef(null);
	const exportModalRef = useRef();
	const exportButtonRef = useRef();

	// Count disabled & filtered patterns.
	const { disabledCount, filteredCount } = countDisabledBlocks(
		allPatterns,
		disabledPatterns,
		filteredPatterns
	);

	/**
	 * Toggle the status of a pattern.
	 *
	 * @param {Element} element The target element.
	 * @param {string}  pattern Pattern name.
	 * @param {string}  title   Pattern title.
	 */
	function togglePattern(element, pattern, title) {
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
			url: gbm_localize.root + 'gbm/pattern/',
			headers: {
				'X-WP-Nonce': gbm_localize.nonce,
				'Content-Type': 'application/json',
			},
			data: { pattern, title, type },
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
					setDisabled(data.disabled_patterns);
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
	function resetPatterns() {
		resetButtonRef?.current?.classList.add('spin'); // Loading state.

		axios({
			method: 'POST',
			url: gbm_localize.root + 'gbm/patterns_reset/',
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
			document.querySelector('#gbm-search').value = '';
			[...groups].forEach(function (group) {
				group.removeAttribute('style');
				const theBlocks = group.querySelectorAll('.item');
				[...theBlocks].forEach(function (block) {
					block.removeAttribute('style');
				});
			});
		}
	}

	return (
		<>
			{loading ? (
				<Loader
					callback={setLoading}
					message={__('Fetching Patterns…', 'block-manager')}
				/>
			) : (
				<>
					<header className="gbm-block-header">
						<div className="gbm-container">
							<div className="gbm-block-header--title">
								<h2>{__('Block Patterns', 'block-manager')}</h2>
								<p>
									{__(
										'Select patterns to be removed from the pattern selector.',
										'block-manager'
									)}
								</p>
							</div>
							<div className="gbm-options">
								<div>
									<Reset
										ref={resetButtonRef}
										callback={resetPatterns}
										total={disabledPatterns?.length}
										msg={__(
											'Are you sure you want to reset the modified Block Patterns?',
											'block-manager'
										)}
										title={__(
											'Clear all Block Patterns',
											'block-manager'
										)}
									/>
									<Export
										ref={exportButtonRef}
										callback={() =>
											exportHook(
												exportModalRef?.current,
												'patterns'
											)
										}
										total={disabledPatterns?.length}
										title={__(
											'Export an array of disabled patterns as a WordPress hook',
											'block-manager'
										)}
									/>
								</div>
							</div>
						</div>
					</header>
					<div className="gbm-block-list-wrapper categories">
						<div className="gbm-container">
							<Sidebar
								categories={categories}
								active={
									allPatterns?.length -
									disabledCount -
									filteredCount
								}
								disabled={disabledCount}
								filtered={filteredCount}
								patterns={disabledPatterns}
								setDisabled={setDisabled}
								search={searchHandler}
							/>
							<div className="gbm-blocks">
								<SearchResults
									data={search}
									callback={() => searchHandler('')}
									className="blocks-render"
								/>
								<div className="gbm-block-groups">
									<div className="gbm-block-lists patterns">
										<>
											{Object.keys(categories).map(
												(category, index) => {
													return (
														<Category
															key={index}
															data={
																categories[
																	category
																]
															}
															togglePattern={
																togglePattern
															}
															disabledPatterns={
																disabledPatterns
															}
															filteredPatterns={
																filteredPatterns
															}
															callback={(e) =>
																bulkProcess(
																	e?.currentTarget,
																	'patterns',
																	setDisabled,
																	setCategoryStatus,
																	setNotifications
																)
															}
														/>
													);
												}
											)}
										</>
									</div>
								</div>
							</div>
						</div>
					</div>
					<ExportModal
						ref={exportModalRef}
						returnButtonRef={exportButtonRef}
						desc={__(
							'Add the the following code to your functions.php to remove patterns at the theme level.',
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
