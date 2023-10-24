import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Render the Loader component.
 *
 * @param {Object}   props          The component props.
 * @param {Function} props.callback The callback function.
 * @return {Element}                The Loader component.
 */
export default function Loader({ callback }) {
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
				<div>
					{__('Fetching Blocks and Categories', 'block-manager')}…
				</div>
			</div>
		</div>
	);
}
