import axios from "axios";
import Search from "../Global/Search";

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
		<div className="gbm-nav">
			<div className="gbm-nav-wrap">
				<p>{gbm_localize.cat_intro}</p>
				<p>{gbm_localize.cat_intro2}</p>
				{!!gbm_localize?.filteredCategories?.length > 0 && (
					<button type="button" className="button" onClick={() => reset()}>
						{gbm_localize.reset_cats}
					</button>
				)}
			</div>
			<Search />
		</div>
	);
}
