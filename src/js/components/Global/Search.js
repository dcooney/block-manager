import { useRef } from '@wordpress/element';
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

	return (
		<div className="gbm-search">
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
			>
				<span className="offscreen">
					{__('Submit', 'block-manager')}
				</span>
				<span className="dashicons dashicons-search"></span>
			</button>
		</div>
	);
}
