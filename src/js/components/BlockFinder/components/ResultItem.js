import { __ } from '@wordpress/i18n';

/**
 * Render a single result item in the Block Finder.
 *
 * @param {Object} props               The component props.
 * @param {Object} props.post          The post data.
 * @param {string} props.postTypeLabel The human-readable post type label.
 * @return {Element}                   The ResultItem component.
 */
export default function ResultItem({ post, postTypeLabel }) {
	const { id, title, type, edit_url } = post;

	return (
		<div className="gbm-finder-result-item">
			<div className="gbm-finder-result-item--info">
				<a
					href={edit_url}
					target="_blank"
					rel="noopener noreferrer"
					title={`${__('Edit', 'block-manager')}: ${title}`}
				>
					{title}
				</a>
				<span className="gbm-finder-result-item--type">
					{postTypeLabel}
				</span>
			</div>
			<a
				className="gbm-finder-result-item--edit"
				href={edit_url}
				target="_blank"
				rel="noopener noreferrer"
			>
				{__('Edit', 'block-manager')}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
					width="12"
					height="12"
				>
					<path
						fill="currentColor"
						d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l82.7 0L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3l0 82.7c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160c0-17.7-14.3-32-32-32L320 0zM80 32C35.8 32 0 67.8 0 112L0 432c0 44.2 35.8 80 80 80l320 0c44.2 0 80-35.8 80-80l0-160c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-320c0-8.8 7.2-16 16-16l160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 32z"
					/>
				</svg>
			</a>
		</div>
	);
}
