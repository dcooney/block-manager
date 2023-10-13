import { forwardRef, useEffect, useRef } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import copyToClipboard from "../../functions/copyToClipboard";

/**
 * Render the ExportModal overlay.
 *
 * @return {Element} The ExportModal component.
 */
const ExportModal = forwardRef(function ExportModal(props, ref) {
	const { data, returnButtonRef, desc } = props;
	const copyButtonRef = useRef();
	const codeRef = useRef();

	/**
	 * Close modal.
	 */
	function close() {
		ref.current.classList.remove("active");
		setTimeout(function () {
			if (returnButtonRef?.current) {
				// Move focus back to the previous element.
				returnButtonRef.current.focus({ preventSrcoll: true });
			}
		}, 150);
	}

	useEffect(() => {
		// Export settings.
		document.addEventListener(
			"keyup",
			function (e) {
				if (e.key === "Escape") {
					close();
				}
			},
			false,
		);
		return () => {};
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div className="gbm-export-modal" ref={ref} tabIndex="0">
			<div className="gbm-export-modal--inner">
				<div>
					<p>{desc}</p>
					<div>
						<button
							type="button"
							className="button button-primary"
							onClick={() =>
								copyToClipboard(codeRef.current, copyButtonRef.current)
							}
							ref={copyButtonRef}
						>
							{__("Copy Code", "block-manager")}
						</button>
						<button
							type="button"
							className="button"
							onClick={() => close()}
						>
							{__("Close", "block-manager")}
						</button>
					</div>
				</div>
				<code
					id="gbm-export"
					contentEditable="true"
					suppressContentEditableWarning={true}
					ref={codeRef}
				>
					{data}
				</code>
			</div>
		</div>
	);
});
export default ExportModal;
