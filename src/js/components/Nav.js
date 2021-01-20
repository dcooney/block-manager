import React from "react";

function Nav({ blocks }) {
	// Search blocks
	const search = () => {
		let searchInput = document.querySelector("#gbm-search");
		let blocks = document.querySelectorAll(
			".gbm-blocks .gbm-block-list button"
		);
		let blockArray = Array.prototype.slice.call(blocks);
		let term = searchInput.value.toLowerCase();

		if (term !== "") {
			blockArray.map(function (block) {
				let str = block.dataset.title.toLowerCase();
				let found = str.search(term);
				if (found !== -1) {
					block.style.display = "flex";
				} else {
					block.style.display = "none";
				}
			});
		} else {
			blockArray.map(function (block) {
				block.style.display = "flex";
			});
		}
	};

	// Slide browser window to block category
	const moveTo = (e) => {
		let el = e.currentTarget;
		let to = el.dataset.to;
		let target = document.querySelector(`#${to}`);
		if (target) {
			const top =
				target.getBoundingClientRect().top + window.pageYOffset - 50;
			window.scrollTo({
				top, // scroll so that the element is at the top of the view
				behavior: "smooth", // smooth scroll
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
								<button
									key={category.info.slug}
									type="button"
									data-to={"block-" + category.info.slug}
									onClick={moveTo}
								>
									{category.info.title}
								</button>
							))}
					</div>
					<div className="gbm-search">
						<label className="offscreen" htmlFor="gbm-search">
							{gbm_localize.search_label}
						</label>
						<input
							type="text"
							id="gbm-search"
							placeholder={gbm_localize.search_label}
							onKeyUp={search}
						/>
						<button type="button" onClick={search}>
							<span className="offscreen">{gbm_localize.submit}</span>
							<span className="dashicons dashicons-search"></span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
export default Nav;
