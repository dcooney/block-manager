import { __, sprintf } from '@wordpress/i18n';
import cn from 'classnames';

/**
 * Render the SearchResults component.
 *
 * @param {Object}   props           The component properties.
 * @param {Object}   props.data      The search data.
 * @param {Function} props.callback  Trigger the reset search function.
 * @param {string}   props.className Optional div classname.
 * @return {Element}                 The SearchResults component.
 */
export default function SearchResults({ data, callback, className }) {
	return (
		<>
			{!!data?.term && (
				<div
					className={cn('gbm-search-results', className && className)}
				>
					{data?.results > 0 ? (
						<>
							<p
								dangerouslySetInnerHTML={{
									__html: sprintf(
										// translators: 1: The search term. 2: Total results.
										__(
											'Your block search for %1$s returned %2$s result(s)',
											'block-manager'
										),
										`<strong>${data?.term}</strong>`,
										`<strong>${data?.results}</strong>`
									),
								}}
							/>
							<span>-</span>
							<button onClick={callback}>
								{__('Clear Search', 'block-manager')}
							</button>
						</>
					) : (
						<>
							<p
								className="gbm-no-results"
								dangerouslySetInnerHTML={{
									__html: sprintf(
										// translators: The search term
										__(
											'No blocks found for %s',
											'block-manager'
										),
										`<strong>${data?.term}</strong>`
									),
								}}
							/>
							<span>-</span>
							<button onClick={callback}>
								{__('Clear Search', 'block-manager')}
							</button>
						</>
					)}
				</div>
			)}
		</>
	);
}
