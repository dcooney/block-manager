import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Render the Loader component.
 *
 * @param {Object}   props          The component props.
 * @param {Function} props.callback The callback function.
 * @param {string}   props.message  Optional loading message.
 * @return {Element}                The Loader component.
 */
export default function Loader({
	callback,
	message = __('Fetching Blocks…', 'block-manager'),
}) {
	useEffect(() => {
		setTimeout(() => {
			callback();
		}, 1000);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps
	return (
		<div className="gbm-loader">
			<div>
				<div className="gbm-loader-pulse-wrap">
					<div className="gbm-loader-pulse"></div>
				</div>
				<div>{message}</div>
			</div>
		</div>
	);
}
