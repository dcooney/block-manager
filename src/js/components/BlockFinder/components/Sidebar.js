import { BlockIcon } from '@wordpress/block-editor';
import { useRef, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import cn from 'classnames';

/**
 * Render the Block Finder Sidebar.
 *
 * @param {Object}   props               The component props.
 * @param {Array}    props.blocks        Array of all blocks.
 * @param {Object}   props.selectedBlock The currently selected block.
 * @param {Function} props.onSelect      Callback when a block is selected.
 * @return {Element}                     The Sidebar component.
 */
export default function Sidebar({ blocks, selectedBlock, onSelect }) {
	const inputRef = useRef();
	const [search, setSearch] = useState('');

	const filtered = search
		? blocks.filter((block) =>
				block.title.toLowerCase().includes(search.toLowerCase())
			)
		: blocks;

	return (
		<div className="gbm-sidebar">
			<div className="gbm-cta">
				<div className="gbm-searchbox">
					<label className="offscreen" htmlFor="gbm-finder-search">
						{__('Search Blocks', 'block-manager')}
					</label>
					<input
						type="text"
						id="gbm-finder-search"
						placeholder={__('Search Blocks', 'block-manager')}
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						ref={inputRef}
					/>
					<button
						type="button"
						onClick={() => inputRef?.current?.focus()}
					>
						<span className="offscreen">
							{__('Search', 'block-manager')}
						</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 512 512"
						>
							<path
								fill="currentColor"
								d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
							/>
						</svg>
					</button>
				</div>
			</div>
			<div className="gbm-cta gbm-finder-block-list">
				<h3>{__('Blocks', 'block-manager')}</h3>
				<div className="gbm-cta-wrap">
					{filtered.length === 0 && (
						<p className="gbm-finder-no-blocks">
							{__('No blocks found.', 'block-manager')}
						</p>
					)}
					{filtered.map((block) => (
						<button
							key={block.name}
							type="button"
							className={cn('gbm-finder-block-item', {
								'is-selected':
									selectedBlock?.name === block.name,
							})}
							onClick={() => onSelect(block)}
							title={block.name}
						>
							<BlockIcon icon={block.icon} />
							<span>{block.title}</span>
						</button>
					))}
				</div>
			</div>
		</div>
	);
}
