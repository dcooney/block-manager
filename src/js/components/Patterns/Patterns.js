import { __, sprintf } from '@wordpress/i18n';
import Loader from '../Global/Loader';
import Reset from '../Global/Reset';
import SearchResults from '../Global/SearchResults';
import { useState } from '@wordpress/element';
import { useRef } from '@wordpress/element';

/**
 * Render the Patterns component.
 *
 * @param {Object} props The component properties.
 * @return {Element}     The Patterns component.
 */
export default function Patterns() {
	const { patterns: categories = [], filteredPatterns = [] } = gbm_localize;
	const [loading, setLoading] = useState(true);

	const resetButtonRef = useRef(null);
	const exportModalRef = useRef();
	const exportButtonRef = useRef();

	console.log(Object.keys(categories));

	/**
	 * Reset to default.
	 */
	function reset() {
		resetButtonRef?.current?.classList.add('spin'); // Loading state.
		axios({
			method: 'POST',
			url: gbm_localize.root + 'gbm/category_reset/',
			headers: {
				'X-WP-Nonce': gbm_localize.nonce,
				'Content-Type': 'application/json',
			},
		})
			.then(function () {
				window?.location?.reload();
			})
			.catch(function (error) {
				console.warn(error);
				resetButtonRef?.current?.classList.remove('spin');
			});
	}

	return (
		<>
			{loading ? (
				<Loader callback={setLoading} />
			) : (
				<>
					<div className="gbm-block-list-wrapper categories">
						{/* <Sidebar
							search={searchHandler}
							total={blocks?.length}
							updated={blockCategories?.length}
							filtered={filteredCategories?.length}
							updatedBlocksOffset={categoryOffsetCount(
								blockCategories,
								disabled_blocks,
								block_names
							)}
							filteredBlocksOffset={categoryOffsetCount(
								filteredCategories,
								disabled_blocks,
								block_names
							)}
						/> */}
						<div className="gbm-blocks">
							<div className="gbm-options">
								<p
									className="gbm-heading"
									dangerouslySetInnerHTML={{
										__html: __(
											'Unregister patterns....',
											'block-manager'
										),
									}}
								/>
								<div>
									<Reset
										ref={resetButtonRef}
										callback={reset}
										total={filteredPatterns?.length}
										msg={__(
											'Are you sure you want to reset your modified Block Patterns?',
											'block-manager'
										)}
										title={__(
											'Clear all Block Patterns',
											'block-manager'
										)}
									/>
								</div>
							</div>
							<div className="gbm-block-groups">
								<div className="gbm-block-lists patterns">
									<>
										{Object.keys(categories).map(
											(category) => {
												return (
													<>
														{!!categories[category]
															?.patterns
															?.length && (
															<div>
																<h3>
																	{
																		categories[
																			category
																		].label
																	}
																</h3>
																{categories[
																	category
																].patterns.map(
																	(
																		pattern
																	) => {
																		return (
																			<div>
																				{
																					pattern.title
																				}
																			</div>
																		);
																	}
																)}
															</div>
														)}
													</>
												);
											}
										)}
									</>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
}
