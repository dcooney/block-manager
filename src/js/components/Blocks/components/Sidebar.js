import { __ } from "@wordpress/i18n";
import Search from "../../Global/Search";
import DisabledSVG from "./DisabledSVG";

/**
 * Render the Sidebar for Block Manager.
 *
 * @param {Object} props          The component props.
 * @param {Array}  props.blocks   WP Blocks.
 * @param {number} props.total    Total number of blocks.
 * @param {number} props.disabled Total number of disabled blocks.
 * @param {number} props.filtered Total number of filtered blocks.
 * @return {Element}              The Sidebar component.
 */
export default function Sidebar({ blocks, total, disabled, filtered }) {
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
			<div className="gbm-cta gbm-cta-block-legend">
				<h3>{__("Block Status", "block-manager")}</h3>
				<div className="gbm-cta-wrap">
					<div className="gbm-legend gbm-legend--total">
						<span>
							<strong>{total}</strong>
						</span>{" "}
						{__("Active", "block-manager")}
					</div>
					<div className="gbm-legend gbm-legend--disabled">
						<span>
							<strong>{disabled}</strong>
							<DisabledSVG className="disabled" />
						</span>
						{__("Disabled", "block-manager")}
					</div>
					{!!filtered && (
						<div className="gbm-legend gbm-legend--filtered">
							<span>
								<strong>{filtered}</strong>
								<DisabledSVG className="filtered" />
							</span>
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
