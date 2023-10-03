import { useEffect } from "@wordpress/element";
import { __, sprintf } from "@wordpress/i18n";
import axios from "axios";
import Block from "./Block";
import Sidebar from "./Sidebar";

/**
 * Render the Categories component.
 *
 * @param {Object} props              The component properties.
 * @param {Array}  props.wpBlocks     The blocks.
 * @param {Array}  props.wpCategories The block categories
 * @return {Element}                  The Categories component.
 */
export default function Categories({ wpBlocks, wpCategories }) {
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
		// Set Loaded.
		const wrapperDiv = document.querySelector(".gbm-block-list-wrapper");
		wrapperDiv.classList.add("loaded");

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
		<div className="gbm-block-list-wrapper categories">
			<Sidebar />
			<div className="gbm-blocks">
				<span className="global-loader loading">
					{__("Loading", "block-manager")}…
				</span>
				<p
					className="gbm-heading"
					dangerouslySetInnerHTML={{ __html: heading }}
				/>
				<div className="gbm-block-group">
					<header className="gbm-block-list-controls categories">
						<h3>{__("Block Name", "block-manager")}</h3>
						<h3>{__("Block Category", "block-manager")}</h3>
					</header>
					<div className="gbm-block-list categories">
						{!!wpBlocks?.length &&
							wpBlocks.map((block, index) => (
								<Block
									key={index}
									callback={changeCategory}
									data={block}
									wpCategories={wpCategories}
								/>
							))}
					</div>
				</div>
			</div>
		</div>
	);
}
