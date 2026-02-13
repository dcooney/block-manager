import { useEffect, useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Render the block Search component.
 *
 * @param {Object}   props             The component properties.
 * @param {Function} props.callback    The callback function to dispatch.
 * @param {string}   props.placeholder The placeholder text for input.
 * @return {Element}                   The Search component.
 */
export default function Search({
	callback,
	placeholder = __('Search Blocks', 'block-manager'),
}) {
	const inputRef = useRef();

	useEffect(() => {
		// Watch for the / key or command + b to focus the search input.
		window.addEventListener('keydown', function (e) {
			const { key } = e;
			if (key === '/' || (e.key === 'b' && (e.metaKey || e.ctrlKey))) {
				inputRef?.current?.focus({ preventScroll: true });
				e.preventDefault();
			}
		});
	});

	return (
		<div className="gbm-searchbox">
			<label className="offscreen" htmlFor="gbm-search">
				{__('Search Blocks', 'block-manager')}
			</label>
			<input
				type="text"
				id="gbm-search"
				placeholder={placeholder}
				onKeyUp={() => callback(inputRef?.current?.value)}
				ref={inputRef}
			/>
			<button
				type="button"
				onClick={() => callback(inputRef?.current?.value)}
				aria-label={__('Submit Search', 'block-manager')}
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
					<path
						fill="currentColor"
						d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
					/>
				</svg>
			</button>
			<span>⌘B</span>
		</div>
	);
}
