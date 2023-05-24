import axios from 'axios';
import React, { useEffect } from 'react';
import Block from './Block';
import Sidebar from './Sidebar';

function Categories({ wpBlocks, wpCategories }) {
	/**
	 * Change the block category.
	 *
	 * @since 1.0
	 */
	const changeCategory = (id, select) => {
		if (!id || !select) {
			return false;
		}
		const value = select.target.value;
		const element = select.target.closest('.item');
		let status = '';

		if (element) {
			element.classList.add('loading');
			status = element.querySelector('.gbm-cat-status');
		}

		// API Request.
		let url = gbm_localize.root + 'gbm/category_switch/';
		let data = { block: id, cat: value };

		// Send request.
		axios({
			method: 'POST',
			url: url,
			headers: {
				'X-WP-Nonce': gbm_localize.nonce,
				'Content-Type': 'application/json',
			},
			data: {
				data: JSON.stringify(data),
			},
		})
			.then(function (res) {
				let response = res.data;
				if (response && res.status == 200) {
					// Success
					if (element) {
						element.classList.remove('loading');
						if (status) {
							status.classList.add('active');
							setTimeout(function () {
								status.classList.remove('active');
							}, 2500);
						}
					}
				} else {
					// Error
					console.log('an error has occurred');
					if (element) {
						element.classList.remove('loading');
					}
				}
			})
			.catch(function (error) {
				// Error
				console.log(error);
				if (element) {
					element.classList.remove('loading');
				}
			});
	};

	// On Load
	useEffect(() => {
		// Set Loaded.
		const wrapperDiv = document.querySelector('.gbm-block-list-wrapper');
		wrapperDiv.classList.add('loaded');

		// Export settings.
		document.addEventListener(
			'keyup',
			function (e) {
				if (e.key === 'Escape') {
					closeExport();
				}
			},
			false
		);
		return () => {};
	}, []);

	return (
		<div className="gbm-block-list-wrapper categories">
			<Sidebar />
			<div className="gbm-blocks">
				<span className="global-loader loading">{gbm_localize.loading}...</span>
				<div className="gbm-block-group">
					<header className="gbm-block-list-controls categories">
						<h3>{gbm_localize.block_switch}</h3>
						<h3>{gbm_localize.cat_switch}</h3>
					</header>
					<div className="gbm-block-list categories">
						{!!wpBlocks && wpBlocks.map((block, index) => <Block key={index} changeCategory={changeCategory} data={block} wpCategories={wpCategories} />)}
					</div>
				</div>
			</div>
		</div>
	);
}
export default Categories;
