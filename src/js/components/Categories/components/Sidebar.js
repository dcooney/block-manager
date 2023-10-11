import { __ } from "@wordpress/i18n";
import Search from "../../Global/Search";

/**
 * Render the Sidebar for Category Manager.
 *
 * @return {Element} The Sidebar component.
 */
export default function Sidebar() {
	return (
		<div className="gbm-sidebar">
			<div className="gbm-cta">
				<h3>{__("Help", "block-manager")}</h3>
				<div className="gbm-cta-wrap">
					<p>
						{__(
							"The Category Switcher provides functionality for changing the categories of WordPress blocks.",
							"block-manager",
						)}
					</p>
					<p>
						{__(
							"Changing a category will update the blocks location in the Block Inserter while editing posts.",
							"block-manager",
						)}
					</p>
					<Search />
				</div>
			</div>
		</div>
	);
}
