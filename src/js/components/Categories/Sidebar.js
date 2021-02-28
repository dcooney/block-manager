import axios from 'axios';
import React from 'react';
import Search from '../Global/Search';

function Sidebar() {
	/**
	 * Reset categories to default.
	 */
	const reset = () => {
		// API Request.
		let url = gbm_localize.root + 'gbm/category_reset/';

		// Send request.
		axios({
			method: 'POST',
			url: url,
			headers: {
				'X-WP-Nonce': gbm_localize.nonce,
				'Content-Type': 'application/json',
			},
		})
			.then(function () {
				// Reload window.
				window.location.reload();
			})
			.catch(function (error) {
				// Error
				console.log(error);
			});
	};

	return (
		<div className="gbm-nav">
			<div id="gbm-sticky-wrapper">
				<div id="gbm-sticky">
					<div className="gbm-nav-wrap">
						<p>{gbm_localize.cat_intro}</p>
						<p>{gbm_localize.cat_intro2}</p>
						{!!gbm_localize.filteredCategories && gbm_localize.filteredCategories.length > 0 && (
							<button type="button" className="button" onClick={reset}>
								{gbm_localize.reset_cats}
							</button>
						)}
					</div>
					<Search />
				</div>
			</div>
		</div>
	);
}
export default Sidebar;
