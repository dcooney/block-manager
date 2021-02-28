import React from 'react';
import Search from '../Global/Search';

/**
 * Sidebar for Blocks Manager.
 *
 * @param {object} blocks WP Blocks.
 */
function Sidebar({ blocks }) {
	// Slide browser window to block category
	const moveTo = (e) => {
		let el = e.currentTarget;
		let to = el.dataset.to;
		let target = document.querySelector(`#${to}`);
		if (target) {
			const top = target.getBoundingClientRect().top + window.pageYOffset - 50;
			window.scrollTo({
				top, // scroll so that the element is at the top of the view
				behavior: 'smooth', // smooth scroll
			});
		}
	};

	return (
		<div className="gbm-nav">
			<div id="gbm-sticky-wrapper">
				<div id="gbm-sticky">
					<div className="gbm-nav-wrap">
						{blocks &&
							blocks.length &&
							blocks.map((category) => (
								<button key={category.info.slug} type="button" data-to={'block-' + category.info.slug} onClick={moveTo}>
									{category.info.title}
								</button>
							))}
					</div>
					<Search />
				</div>
			</div>
		</div>
	);
}
export default Sidebar;
