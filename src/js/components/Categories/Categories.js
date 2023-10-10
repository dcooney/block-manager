import { useEffect, useState } from "@wordpress/element";
import { __, sprintf } from "@wordpress/i18n";
import axios from "axios";
import Block from "./components/Block";
import Sidebar from "./components/Sidebar";
import { organizeCategories } from "../../functions/getCategoryData";

/**
 * Render the Categories component.
 *
 * @param {Object} props              The component properties.
 * @param {Array}  props.wpBlocks     The blocks.
 * @param {Array}  props.wpCategories The block categories
 * @return {Element}                  The Categories component.
 */
export default function Categories({ wpBlocks, wpCategories }) {
	const [loading, setLoading] = useState(true);
	const data = organizeCategories(wpCategories, wpBlocks);

	const heading = sprintf(
		// translators: %s: The number of blocks.
		__(
			"Update the categories of your %s blocks with the category switcher.",
			"block-manager",
		),
		`<span>${wpBlocks?.length}</span>`,
	);

	/**
	 * Change the block category.
	 *
	 * @param {string} id     The block ID.
	 * @param {Object} select The select element.
	 * @since 1.0
	 */
	const changeCategory = (id, select) => {
		if (!id || !select) {
			return false;
		}
		const value = select.target.value;
		const element = select.target.closest(".item");
		let status = "";

		if (element) {
			element.classList.add("loading");
			status = element.querySelector(".gbm-cat-status");
		}

		// API Request.
		const url = gbm_localize.root + "gbm/category_switch/";
		const data = { block: id, cat: value };

		// Send request.
		axios({
			method: "POST",
			url,
			headers: {
				"X-WP-Nonce": gbm_localize.nonce,
				"Content-Type": "application/json",
			},
			data: {
				data: JSON.stringify(data),
			},
		})
			.then(function (res) {
				const response = res.data;
				if (response && res.status === 200) {
					// Success
					if (element) {
						element.classList.remove("loading");
						if (status) {
							status.classList.add("active");
							setTimeout(function () {
								status.classList.remove("active");
							}, 2500);
						}
					}
				} else {
					console.warn("an error has occurred");
					if (element) {
						element.classList.remove("loading");
					}
				}
			})
			.catch(function (error) {
				console.warn(error);
				if (element) {
					element.classList.remove("loading");
				}
			});
	};

	// On Load
	useEffect(() => {
		setTimeout(function () {
			setLoading(false);
		}, 250);

		// Export settings.
		document.addEventListener(
			"keyup",
			function (e) {
				if (e.key === "Escape") {
					closeExport();
				}
			},
			false,
		);
		return () => {};
	}, []);

	return (
		<>
			{loading ? (
				<span className="gbm-loader">
					{__("Fetching Blocks and Categories", "block-manager")}…
				</span>
			) : (
				<div className="gbm-block-list-wrapper categories">
					<Sidebar />
					<div className="gbm-blocks">
						<div className="gbm-options">
							<p
								className="gbm-heading"
								dangerouslySetInnerHTML={{ __html: heading }}
							/>
						</div>
						<div className="gbm-block-group">
							<div className="gbm-block-list categories">
								{!!wpCategories?.length && <span>dwdw</span>}
								<>
									{!!wpBlocks?.length &&
										wpBlocks.map((block, index) => (
											<Block
												key={index}
												callback={changeCategory}
												data={block}
												wpCategories={wpCategories}
											/>
										))}
								</>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
