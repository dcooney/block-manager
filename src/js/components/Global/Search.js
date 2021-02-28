function Search() {
	// Search blocks
	const search = () => {
		const searchInput = document.querySelector('#gbm-search');
		const blocks = document.querySelectorAll('.gbm-blocks .gbm-block-list .item');
		const blockArray = Array.prototype.slice.call(blocks);
		const term = searchInput.value.toLowerCase();

		if (term !== '') {
			blockArray.map(function (block) {
				let str = block.dataset.title.toLowerCase();
				let found = str.search(term);
				if (found !== -1) {
					block.style.display = 'flex';
				} else {
					block.style.display = 'none';
				}
			});
		} else {
			blockArray.map(function (block) {
				block.style.display = 'flex';
			});
		}
	};

	return (
		<div className="gbm-search">
			<label className="offscreen" htmlFor="gbm-search">
				{gbm_localize.search_label}
			</label>
			<input type="text" id="gbm-search" placeholder={gbm_localize.search_label} onKeyUp={search} />
			<button type="button" onClick={search}>
				<span className="offscreen">{gbm_localize.submit}</span>
				<span className="dashicons dashicons-search"></span>
			</button>
		</div>
	);
}
export default Search;
