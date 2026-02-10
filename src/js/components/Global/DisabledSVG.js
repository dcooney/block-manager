import cn from 'classnames';

/**
 * Render the DisabledSVG component.
 *
 * @param {Object} props           The component props.
 * @param {string} props.className Clasnames for component.
 * @return {Element}               The DisabledSVG component.
 * @deprecated 4.0 This component is no longer used in the Block Manager interface and will be removed in a future release.
 */
export default function DisabledSVG({ className }) {
	return (
		<svg className={cn('disabled-svg', className && className)}>
			<line x1="0" y1="100%" x2="100%" y2="0" />
			<line x1="0" y1="0" x2="100%" y2="100%" />
		</svg>
	);
}
