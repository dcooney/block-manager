import { useRef } from '@wordpress/element';
import axios from 'axios';

/**
 * Render the block ToggleSwitch component.
 *
 * @param {Object}  props          The component properties.
 * @param {boolean} props.active   Is the button active?
 * @param {string}  props.option   The WP option name.
 * @param {string}  props.label    The switch label.
 * @param {string}  props.desc     The switch description.
 * @param {boolean} props.disabled Is the button disabled?
 * @return {Element}               The ToggleSwitch component.
 */
export default function ToggleSwitch({
	active = true,
	option,
	label,
	desc,
	disabled = false,
}) {
	const buttonRef = useRef(null);

	if (!option) {
		return null;
	}

	/**
	 * Toggle the status of a pattern toggle switch.
	 */
	function handler() {
		if (buttonRef.current.classList.contains('loading')) {
			return false;
		}
		buttonRef.current.classList.add('loading');

		const type = buttonRef.current.classList.contains('disabled')
			? 'disable'
			: 'enable';

		// Send API Request.
		axios({
			method: 'POST',
			url: gbm_localize.root + 'gbm/pattern/',
			headers: {
				'X-WP-Nonce': gbm_localize.nonce,
				'Content-Type': 'application/json',
			},
			data: { pattern: option, title: label, type },
		})
			.then(function (res) {
				const { data = {}, status } = res;
				const { success = true } = data;
				if (data && status === 200) {
					if (success) {
						if (type === 'disable') {
							buttonRef.current.classList.remove('disabled');
						} else {
							buttonRef.current.classList.add('disabled');
						}
					}
					buttonRef.current.classList.remove('loading');
				} else {
					buttonRef.current.classList.remove('loading');
					console.warn(__('An error has occurred', 'block-manager'));
				}
			})
			.catch(function (error) {
				buttonRef.current.classList.remove('loading');
				console.warn(error);
			});
	}

	return (
		<div className="gbm-block-switch--container">
			<button
				ref={buttonRef}
				className={`gbm-block-switch${active ? ' disabled' : ''}`}
				onClick={() => handler()}
				aria-label={label}
				disabled={disabled}
			>
				<div className="gbm-block-switch--inner">
					<span></span>
				</div>
				{label && <span>{label}</span>}
			</button>
			{desc && <p>{desc}</p>}
		</div>
	);
}
