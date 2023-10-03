import axios from "axios";
import Search from "../Global/Search";
import { __ } from "@wordpress/i18n";

/**
 * Render the Sidebar for Category Manager.
 *
 * @return {Element} The Sidebar component.
 */
export default function Sidebar() {
	/**
	 * Reset categories to default.
	 */
	function reset() {
		const url = gbm_localize.root + "gbm/category_reset/";
		axios({
			method: "POST",
			url,
			headers: {
				"X-WP-Nonce": gbm_localize.nonce,
				"Content-Type": "application/json",
			},
		})
			.then(function () {
				// Reload window.
				window.location.reload();
			})
			.catch(function (error) {
				console.warn(error);
			});
	}

	return (
		<div className="gbm-sidebar">
			<h3>{__("Help", "block-manager")}</h3>
			<div className="gbm-cta">
				<div className="gbm-cta-wrap">
					<p>
						{__(
							"The Category Switcher provides functionality for changing the categories of Gutenberg blocks.",
							"block-manager",
						)}
					</p>
					<p>
						{__(
							"Changing a block category will update it's location in the Gutenberg Block Inserter while editing posts.",
							"block-manager",
						)}
					</p>
					{!!gbm_localize?.filteredCategories?.length > 0 && (
						<button
							type="button"
							className="button"
							onClick={() => reset()}
						>
							{__("Reset Categories", "block-manager")}
						</button>
					)}
					<Search />
				</div>
			</div>
		</div>
	);
}
