import { useEffect, useRef, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import axios from 'axios';
import Loader from '../Global/Loader';
import Notifications from '../Global/Notifications';
import Sidebar from './components/Sidebar';
import ResultItem from './components/ResultItem';

/**
 * Render the Block Finder component.
 *
 * @param {Object} props              The component props.
 * @param {Array}  props.wpBlocks     Array of WP blocks.
 * @param {Array}  props.wpCategories Array of WP block categories.
 * @return {Element}                  The BlockFinder component.
 */
export default function BlockFinder({ wpBlocks, wpCategories }) {
	const [loading, setLoading] = useState(true);
	const [searching, setSearching] = useState(false);
	const [selectedBlock, setSelectedBlock] = useState(null);
	const [results, setResults] = useState([]);
	const [total, setTotal] = useState(0);
	const [page, setPage] = useState(1);
	const [perPage, setPerPage] = useState(50);
	const [notifications, setNotifications] = useState([]);
	const [blocks, setBlocks] = useState([]);

	const postTypes = gbm_localize?.postTypes || [];

	/**
	 * Get the label for a post type.
	 *
	 * @param {string} type The post type name.
	 * @return {string}     The post type label.
	 */
	function getPostTypeLabel(type) {
		const found = postTypes.find((pt) => pt.name === type);
		return found ? found.label : type;
	}

	/**
	 * Search for posts containing a block.
	 *
	 * @param {string} blockName The block name to search for.
	 * @param {number} pageNum   The page number.
	 */
	function findBlock(blockName, pageNum = 1) {
		setSearching(true);

		axios({
			method: 'POST',
			url: gbm_localize.root + 'gbm/block_finder/',
			headers: {
				'X-WP-Nonce': gbm_localize.nonce,
				'Content-Type': 'application/json',
			},
			data: { block: blockName, page: pageNum },
		})
			.then(function (res) {
				const { data = {} } = res;
				if (data?.success) {
					if (pageNum === 1) {
						setResults(data.posts);
					} else {
						setResults((prev) => [...prev, ...data.posts]);
					}
					setTotal(data.total);
					setPage(pageNum);
					setPerPage(data.per_page);
				} else {
					setNotifications((prev) => [
						...prev,
						{
							id: Date.now(),
							msg: data?.msg || __('An error occurred', 'block-manager'),
							success: false,
						},
					]);
				}
				setSearching(false);
			})
			.catch(function (error) {
				console.warn(error);
				setSearching(false);
			});
	}

	/**
	 * Handle block selection from sidebar.
	 *
	 * @param {Object} block The selected block.
	 */
	function selectBlock(block) {
		setSelectedBlock(block);
		setResults([]);
		setTotal(0);
		setPage(1);
		findBlock(block.name, 1);

		// Update URL for deep linking.
		const url = new URL(window.location.href);
		url.searchParams.set('block', block.name);
		window.history.replaceState(null, '', url.toString());
	}

	/**
	 * Load more results.
	 */
	function loadMore() {
		if (selectedBlock) {
			findBlock(selectedBlock.name, page + 1);
		}
	}

	/**
	 * Organize blocks into a flat sorted list.
	 */
	function organizeBlocks() {
		if (!wpBlocks?.length) {
			return;
		}
		const sorted = [...wpBlocks].sort((a, b) =>
			a.title.localeCompare(b.title)
		);
		setBlocks(sorted);
	}

	useEffect(() => {
		organizeBlocks();

		// Check URL for deep-linked block.
		const url = new URL(window.location.href);
		const blockParam = url.searchParams.get('block');
		if (blockParam && wpBlocks?.length) {
			const match = wpBlocks.find((b) => b.name === blockParam);
			if (match) {
				setSelectedBlock(match);
				findBlock(match.name, 1);
			}
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const hasMore = results.length < total;

	return (
		<>
			{loading ? (
				<Loader callback={setLoading} />
			) : (
				<>
					<header className="gbm-block-header">
						<div className="gbm-container">
							<div className="gbm-block-header--title">
								<h2>{__('Block Finder', 'block-manager')}</h2>
								<p>
									{__(
										'Find all posts and pages that contain a specific block.',
										'block-manager'
									)}
								</p>
							</div>
						</div>
					</header>
					<div className="gbm-block-list-wrapper">
						<div className="gbm-container">
							<Sidebar
								blocks={blocks}
								selectedBlock={selectedBlock}
								onSelect={selectBlock}
							/>
							<div className="gbm-blocks gbm-finder-results">
								{!selectedBlock && (
									<div className="gbm-finder-empty">
										<p>
											{__(
												'Select a block from the sidebar to find posts that use it.',
												'block-manager'
											)}
										</p>
									</div>
								)}
								{selectedBlock && searching && results.length === 0 && (
									<div className="gbm-finder-searching">
										<p>{__('Searching…', 'block-manager')}</p>
									</div>
								)}
								{selectedBlock && !searching && results.length === 0 && (
									<div className="gbm-finder-empty">
										<p>
											{__(
												'No posts found containing this block.',
												'block-manager'
											)}
										</p>
									</div>
								)}
								{results.length > 0 && (
									<>
										<div className="gbm-finder-results-header">
											<p>
												<strong>{total}</strong>{' '}
												{total === 1
													? __('post found', 'block-manager')
													: __('posts found', 'block-manager')}
											</p>
										</div>
										<div className="gbm-finder-results-list">
											{results.map((post) => (
												<ResultItem
													key={post.id}
													post={post}
													postTypeLabel={getPostTypeLabel(
														post.type
													)}
												/>
											))}
										</div>
										{hasMore && (
											<div className="gbm-finder-load-more">
												<button
													type="button"
													onClick={loadMore}
													disabled={searching}
												>
													{searching
														? __('Loading…', 'block-manager')
														: __('Load More', 'block-manager')}
												</button>
											</div>
										)}
									</>
								)}
							</div>
						</div>
					</div>
					<Notifications
						notifications={notifications}
						setNotifications={setNotifications}
					/>
				</>
			)}
		</>
	);
}
