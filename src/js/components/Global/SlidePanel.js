import { BlockIcon } from '@wordpress/block-editor';
import { useEffect, useState } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import axios from 'axios';
import ResultItem from '../BlockFinder/components/ResultItem';

/**
 * Render a slide panel with block details and finder results.
 *
 * @param {Object}   props            The component props.
 * @param {Object}   props.block      The block data to display.
 * @param {boolean}  props.open       Whether the panel is open.
 * @param {Function} props.onClose    Callback to close the panel.
 * @param {boolean}  props.isDisabled Whether the block is disabled.
 * @param {boolean}  props.isFiltered Whether the block is filtered.
 * @return {Element}                  The SlidePanel component.
 */
export default function SlidePanel({
	block,
	open,
	onClose,
	isDisabled,
	isFiltered,
}) {
	const [results, setResults] = useState([]);
	const [total, setTotal] = useState(0);
	const [page, setPage] = useState(1);
	const [perPage, setPerPage] = useState(20);
	const [searching, setSearching] = useState(false);

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
	 * Search for posts containing this block.
	 *
	 * @param {string} blockName The block name.
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
				}
				setSearching(false);
			})
			.catch(function (error) {
				console.warn(error);
				setSearching(false);
			});
	}

	/**
	 * Load more results.
	 */
	function loadMore() {
		if (block) {
			findBlock(block.name, page + 1);
		}
	}

	// Auto-search when panel opens with a new block.
	useEffect(() => {
		if (open && block) {
			setResults([]);
			setTotal(0);
			setPage(1);
			findBlock(block.name, 1);
		}
	}, [open, block?.name]); // eslint-disable-line react-hooks/exhaustive-deps

	// Handle Escape key.
	useEffect(() => {
		function handleKeyDown(e) {
			if (e.key === 'Escape' && open) {
				onClose();
			}
		}
		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [open, onClose]);

	// Prevent body scroll when open.
	useEffect(() => {
		if (open) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [open]);

	if (!block) {
		return null;
	}

	const hasMore = results.length < total;

	// Determine status label.
	let status = __('Active', 'block-manager');
	let statusClass = 'active';
	if (isFiltered) {
		status = __('Filtered', 'block-manager');
		statusClass = 'filtered';
	} else if (isDisabled) {
		status = __('Disabled', 'block-manager');
		statusClass = 'disabled';
	}

	return (
		<>
			<div
				className={`gbm-slide-panel-overlay${open ? ' active' : ''}`}
				onClick={onClose}
			/>
			<div className={`gbm-slide-panel${open ? ' active' : ''}`}>
				<div className="gbm-slide-panel--header">
					<h3>{__('Block Details', 'block-manager')}</h3>
					<button
						type="button"
						className="gbm-slide-panel--close"
						onClick={onClose}
						aria-label={__('Close panel', 'block-manager')}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							width="20"
							height="20"
						>
							<path
								fill="currentColor"
								d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
							/>
						</svg>
					</button>
				</div>
				<div className="gbm-slide-panel--content">
					<div className="gbm-slide-panel--block-info">
						<div className="gbm-slide-panel--block-icon">
							<BlockIcon icon={block.icon} />
						</div>
						<div className="gbm-slide-panel--block-meta">
							<h4 className="gbm-slide-panel--block-title">
								{block.title}
							</h4>
							<code className="gbm-slide-panel--block-name">
								{block.name}
							</code>
						</div>
					</div>
					{!!block.description && (
						<p className="gbm-slide-panel--block-desc">
							{block.description}
						</p>
					)}
					<div className="gbm-slide-panel--details">
						<div className="gbm-slide-panel--detail">
							<span className="gbm-slide-panel--detail-label">
								{__('Category', 'block-manager')}
							</span>
							<span className="gbm-slide-panel--detail-value">
								{block.category}
							</span>
						</div>
						<div className="gbm-slide-panel--detail">
							<span className="gbm-slide-panel--detail-label">
								{__('Status', 'block-manager')}
							</span>
							<span
								className={`gbm-slide-panel--detail-status gbm-slide-panel--detail-status--${statusClass}`}
							>
								{status}
							</span>
						</div>
						{!!block.variation && (
							<div className="gbm-slide-panel--detail">
								<span className="gbm-slide-panel--detail-label">
									{__('Variation of', 'block-manager')}
								</span>
								<span className="gbm-slide-panel--detail-value">
									{block.variation}
								</span>
							</div>
						)}
					</div>

					<div className="gbm-slide-panel--finder">
						<h4>{__('Block Finder', 'block-manager')}</h4>
						{searching && results.length === 0 && (
							<p className="gbm-slide-panel--finder-searching">
								{__(
									'Searching for posts\u2026',
									'block-manager'
								)}
							</p>
						)}
						{!searching && results.length === 0 && (
							<p className="gbm-slide-panel--finder-empty">
								{__(
									'No posts found containing this block.',
									'block-manager'
								)}
							</p>
						)}
						{results.length > 0 && (
							<>
								<p className="gbm-slide-panel--finder-count">
									<strong>{total}</strong>{' '}
									{total === 1
										? __('post found', 'block-manager')
										: __('posts found', 'block-manager')}
								</p>
								<div className="gbm-slide-panel--finder-results">
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
									<div className="gbm-slide-panel--finder-load-more">
										<button
											type="button"
											onClick={loadMore}
											disabled={searching}
										>
											{searching
												? __(
														'Loading\u2026',
														'block-manager'
													)
												: __(
														'Load More',
														'block-manager'
													)}
										</button>
									</div>
								)}
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
