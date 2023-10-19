import { forwardRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Render the Reset blocks button.
 *
 * @return {Element} The Reset component.
 */
const Reset = forwardRef(function Reset(props, ref) {
	const { callback, total = 0, msg, title } = props;

	/**
	 * Confirm user wants to clear disabled blocks.
	 */
	function confirm() {
		if (
			// eslint-disable-next-line no-alert
			window?.confirm(msg)
		) {
			callback();
		}
	}

	return (
		<button
			ref={ref}
			type="button"
			onClick={() => confirm()}
			title={title}
			disabled={total < 1}
		>
			<span className="dashicons dashicons-update-alt"></span>
			{__('Reset', 'block-manager')}
		</button>
	);
});
export default Reset;
