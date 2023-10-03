import { __ } from "@wordpress/i18n";
import Search from "../../Global/Search";

/**
 * Render the Sidebar for Block Manager.
 *
 * @param {Object} props        The component props.
 * @param {Array}  props.blocks WP Blocks.
 * @return {Element}            The Sidebar component.
 */
export default function Sidebar({ blocks }) {
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
			<p>
				Maecenas faucibus mollis interdum. Nullam quis risus eget urna
				mollis ornare vel eu leo.
			</p>
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