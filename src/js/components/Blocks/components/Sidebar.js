import { __ } from "@wordpress/i18n";
import Search from "../../Global/Search";
import DisabledSVG from "./DisabledSVG";
import { useEffect, useRef, useState } from "@wordpress/element";

/**
 * Render the Sidebar for Block Manager.
 *
 * @param {Object} props          The component props.
 * @param {Array}  props.blocks   WP Blocks.
 * @param {number} props.active   Total number of active blocks.
 * @param {number} props.disabled Total number of disabled blocks.
 * @param {number} props.filtered Total number of filtered blocks.
 * @return {Element}              The Sidebar component.
 */
export default function Sidebar({ blocks, active, disabled, filtered }) {
	const activeRef = useRef(null);
	const disabledRef = useRef(null);
	const mountedRef = useRef(false);

	const [activeTotal, setActiveTotal] = useState(active);
	const [disabledTotal, setDisabledTotal] = useState(disabled);

	/**
	 * Block total update animation.
	 * @param {Element}  ref      The ref element.
	 * @param {Number}   value    The current value.
	 * @param {FUnction} callback The callback function.
	 */
	function change(ref, value, callback) {
		if (!mountedRef?.current || !ref) {
			return;
		}
		const prev = ref?.dataset?.prev;
		const direction = parseInt(prev) > value ? "up" : "down";
		ref?.classList?.add(`slide-${direction}`);

		console.log(`slide-done-${direction}`);
		setTimeout(() => {
			callback(value);
			ref?.classList?.add(`slide-${direction}-done`);
			ref?.classList?.remove(`slide-${direction}`);
			setTimeout(() => {
				ref?.classList?.remove(`slide-${direction}-done`);
			}, 75);
		}, 200);
	}

	// Update the active blocks.
	useEffect(() => {
		change(activeRef.current, active, setActiveTotal);
	}, [active]);

	// Update the disabled blocks.
	useEffect(() => {
		setTimeout(() => {
			change(disabledRef.current, disabled, setDisabledTotal);
		}, 125);
	}, [disabled]);

	useEffect(() => {
		setTimeout(() => {
			mountedRef.current = true;
		}, 500);
	}, []);

	/**
	 * Scroll to the selected block.
	 *
	 * @param {Event} e The click event.
	 */
	function scrollTo(e) {
		const el = e.currentTarget;
		const to = el.dataset.to;
		const target = document.querySelector(`#${to}`);
		if (target) {
			const top = target.getBoundingClientRect().top + window.scrollY - 50;
			window.scrollTo({
				top,
				behavior: "smooth",
			});
			target.focus({ preventScroll: true });
		}
	}

	return (
		<div className="gbm-sidebar">
			<div
				className="gbm-cta gbm-cta-block-legend"
				aria-label={__("Current Block Status", "block-manager")}
			>
				<div className="gbm-cta-wrap">
					<div
						className="gbm-legend gbm-legend--total"
						title={__("Blocks Active", "block-manager")}
					>
						<div>
							<span>
								<strong ref={activeRef} data-prev={activeTotal}>
									{activeTotal}
								</strong>
							</span>
						</div>
						{__("Active", "block-manager")}
					</div>
					<div
						className="gbm-legend gbm-legend--disabled"
						title={__("Blocks Disabled", "block-manager")}
					>
						<div>
							<span>
								<strong ref={disabledRef} data-prev={disabledTotal}>
									{disabledTotal}
								</strong>
							</span>
							<DisabledSVG className="disabled" />
						</div>
						{__("Disabled", "block-manager")}
					</div>
					{!!filtered && (
						<div
							className="gbm-legend gbm-legend--filtered"
							title={__("Blocks Filtered", "block-manager")}
						>
							<div>
								<span>
									<strong>{filtered}</strong>
									<DisabledSVG className="filtered" />
								</span>
							</div>
							{__("Filtered", "block-manager")}
						</div>
					)}
				</div>
			</div>
			<div className="gbm-cta">
				<h3>{__("Categories", "block-manager")}</h3>
				<div className="gbm-cta-wrap">
					{!!blocks?.length &&
						blocks.map((category) => (
							<button
								key={category?.info?.slug}
								type="button"
								data-to={"block-" + category?.info?.slug}
								onClick={(e) => scrollTo(e)}
							>
								{category?.info?.title}
							</button>
						))}
					<Search />
				</div>
			</div>
		</div>
	);
}
