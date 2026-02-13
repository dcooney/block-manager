import classNames from 'classnames';

/**
 * Toggle Switch display.
 *
 * @param {Object}   props          The component props.
 * @param {boolean}  props.active.  The state of the switch.
 * @param {boolean}  props.filtered The filtered state of the switch.
 * @param {string}   props.title    The title for the switch button.
 * @param {Function} props.onClick  The function to call when the switch is clicked.
 * @return {Element}                The Switch component.
 */
export default function Switch({ active, filtered, title, onClick }) {
	return (
		<button
			className={classNames(
				'gbm-switch',
				active ? 'is-active' : null,
				!active ? 'is-disabled' : null,
				filtered ? 'is-filtered' : null
			)}
			data-state={active ? 'inactive' : 'active'}
			aria-label={title}
			title={title}
			onClick={onClick}
		>
			{active ? (
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
					<path d="M384 32c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96C0 60.7 28.7 32 64 32l320 0zM342 145.7c-10.7-7.8-25.7-5.4-33.5 5.3L189.1 315.2 137 263.1c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l72 72c5 5 11.9 7.5 18.8 7s13.4-4.1 17.5-9.8L347.3 179.2c7.8-10.7 5.4-25.7-5.3-33.5z" />
				</svg>
			) : (
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
					<path d="M384 64c17.7 0 32 14.3 32 32l0 320c0 17.7-14.3 32-32 32L64 448c-17.7 0-32-14.3-32-32L32 96c0-17.7 14.3-32 32-32l320 0zM64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32z" />
				</svg>
			)}
		</button>
	);
}
