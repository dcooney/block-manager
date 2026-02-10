import classNames from 'classnames';

/**
 * Toggle Switch display.
 *
 * @param {Object}   props         The component props.
 * @param {boolean}  props.active  The state of the switch.
 * @param {string}   props.title   The title for the switch button.
 * @param {Function} props.onClick The function to call when the switch is clicked.
 * @return {Element}               The Switch component.
 */
export default function Switch({ active, title, onClick }) {
	return (
		<button
			className={classNames(
				'gbm-block-switch',
				active ? 'disabled' : null
			)}
			data-state={active ? 'inactive' : 'active'}
			aria-label={title}
			title={title}
			onClick={onClick}
		>
			<div className="gbm-block-switch--inner">
				<span></span>
			</div>
		</button>
	);
}
