import { forwardRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Render the Reset blocks button.
 *
 * @return {Element} The Reset component.
 */
const Reset = forwardRef(function Reset(props, ref) {
	const { callback, total = 0 } = props;

	/**
	 * Confirm user wants to clear disabled blocks.
	 */
	function confirm() {
		if (
			// eslint-disable-next-line no-alert
			window?.confirm(
				__(
					'Are you sure you want to reset and activate all currently disabled blocks?',
					'block-manager'
				)
			)
		) {
			callback();
		}
	}

	return (
		<button
			ref={ref}
			type="button"
			onClick={() => confirm()}
			title={__('Clear all disabled blocks', 'block-manager')}
			disabled={total < 1}
		>
			<span className="dashicons dashicons-update-alt"></span>
			{__('Reset', 'block-manager')}
		</button>
	);
});
export default Reset;
