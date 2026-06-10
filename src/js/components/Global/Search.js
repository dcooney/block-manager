import { useEffect, useRef, useState } from '@wordpress/element';
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
	const [hasValue, setHasValue] = useState(false);

	useEffect(() => {
		// Watch for the '/' key to focus the search input.
		window.addEventListener('keyup', function (e) {
			const { key } = e;
			if (key === '/') {
				inputRef?.current?.focus({ preventScroll: true });
			}
		});
	});

	return (
		<div className="gbm-cta">
			<div className="gbm-search">
				<label className="offscreen" htmlFor="gbm-search">
					{__('Search Blocks', 'block-manager')}
				</label>
				<input
					type="text"
					id="gbm-search"
					placeholder={placeholder}
					onKeyUp={() => {
						const val = inputRef?.current?.value;
						setHasValue(!!val);
						callback(val);
					}}
					ref={inputRef}
				/>
				{hasValue && (
					<button
						type="button"
						onClick={() => {
							setHasValue(false);
							callback('');
						}}
						className="clear-search"
						aria-label={__('Clear Search', 'block-manager')}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 640 640"
						>
							<path d="M182.9 137.4L160.3 114.7L115 160L137.6 182.6L275 320L137.6 457.4L115 480L160.3 525.3L182.9 502.6L320.3 365.3L457.6 502.6L480.3 525.3L525.5 480L502.9 457.4L365.5 320L502.9 182.6L525.5 160L480.3 114.7L457.6 137.4L320.3 274.7L182.9 137.4z" />
						</svg>
					</button>
				)}
				<button
					type="button"
					onClick={() => callback(inputRef?.current?.value)}
				>
					<span className="offscreen">
						{__('Submit', 'block-manager')}
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
	);
}
