import { useEffect, useRef } from '@wordpress/element';
import cn from 'classnames';

/**
 * Render the ToNotificationsastList component.
 *
 * @param {Object}   props                  The component properties.
 * @param {Array}    props.notifications    The list of notifications to display.
 * @param {Function} props.setNotifications The callback function to remove a notification.
 * @return {Element}                        The Notifications component.
 */
export default function Notifications({ notifications, setNotifications }) {
	return (
		<div className="gbm-notification-list" aria-live="assertive">
			{!!notifications?.length &&
				notifications.map((item) => {
					return (
						<Notification
							key={`notification-${item.id}`}
							id={item.id}
							msg={item?.msg}
							success={item?.success}
							callback={setNotifications}
						/>
					);
				})}
		</div>
	);
}

/**
 * Render an individual Notification display.
 *
 * @param {Object}   props          The component properties.
 * @param {string}   props.id       Notification ID.
 * @param {string}   props.msg      Message to display.
 * @param {boolean}  props.success  Type of message.
 * @param {Function} props.callback Function to call after message is displayed.
 * @return {Element}                The Notification component.
 */
function Notification({ id, msg = '', success = true, callback }) {
	const ref = useRef(null);

	// Use timeouts to display and then remove the notification.
	useEffect(() => {
		ref?.current?.classList.add('active');
		if (msg) {
			setTimeout(() => {
				ref?.current?.classList.add('out');
				setTimeout(() => {
					// Add an extra long delay before deleting the notification.
					removeNotification(id, callback);
				}, 1000);
			}, 3000);
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<>
			<div
				className={cn(
					'gbm-notification',
					`gbm-notification--${success ? 'success' : 'error'}`
				)}
				role="alert"
				ref={ref}
			>
				<span
					className={`dashicons dashicons-${
						success ? 'yes-alt' : 'no'
					}`}
				></span>
				<span
					dangerouslySetInnerHTML={{
						__html: msg,
					}}
				/>
			</div>
		</>
	);
}

/**
 * Remove a notification.
 *
 * @param {string}   id       The notification ID.
 * @param {Function} callback Function to call after updating state.
 */
function removeNotification(id, callback) {
	callback((prev) => prev.filter((notification) => notification.id !== id));
}

/* eslint-disable no-unused-vars */
function TestNotifications() {
	return (
		<>
			<div
				className={cn(
					'gbm-notification',
					`gbm-notification--success`,
					'active'
				)}
				role="alert"
			>
				<span className={`dashicons dashicons-yes-alt`}></span>
				<span>Block Activated</span>
			</div>
			<div
				className={cn(
					'gbm-notification',
					`gbm-notification--error`,
					'active'
				)}
				role="alert"
			>
				<span className={`dashicons dashicons-no`}></span>
				<span>Error Accessing API</span>
			</div>
		</>
	);
}
/* eslint-enable no-unused-vars */
