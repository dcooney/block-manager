import { __ } from "@wordpress/i18n";
import Search from "../../Global/Search";

/**
 * Render the Sidebar for Category Manager.
 *
 * @param {Object}   props        The component properties.
 * @param {Function} props.search The search handler function.
 * @return {Element}              The Sidebar component.
 */
export default function Sidebar({ search }) {
	return (
		<div className="gbm-sidebar">
			<div className="gbm-cta">
				<h3>{__("Help", "block-manager")}</h3>
				<div className="gbm-cta-wrap">
					<p>
						{__(
							"The Block Manager Category Switcher provides functionality for updating the categories of WordPress blocks.",
							"block-manager",
						)}
					</p>
					<p>
						{__(
							"Modifying a category will update the blocks location in the Block Inserter while editing posts.",
							"block-manager",
						)}
					</p>
					<Search callback={search} />
				</div>
			</div>
		</div>
	);
}
