import { useEffect, useRef, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import Search from "../../Global/Search";

/**
 * Render the Sidebar for Category Manager.
 *
 * @param {Object}   props                     The component properties.
 * @param {Function} props.search              The search handler function.
 * @param {number}   props.total               Total blocks.
 * @param {number}   props.updated             Updated block categories.
 * @param {number}   props.filtered            Total number of filtered block categories.
 * @param {number}   props.disabledBlocksCount Total number of disabled blocks.
 * @param {number}   props.filteredBlocksCount Total number of filtered blocks.
 * @return {Element}                           The Sidebar component.
 */
export default function Sidebar({
	search,
	total,
	updated,
	filtered,
	disabledBlocksCount,
	filteredBlocksCount,
}) {
	const updatedRef = useRef(null);
	const mountedRef = useRef(false);
	const [updatedTotal, setUpdatedTotal] = useState(
		updated - disabledBlocksCount,
	);

	/**
	 * Block total update animation.
	 * @param {Element}  ref      The ref element.
	 * @param {number}   value    The current value.
	 * @param {Function} callback The callback function.
	 */
	function change(ref, value, callback) {
		if (!mountedRef?.current || !ref) {
			return;
		}
		const prev = ref?.dataset?.prev;
		const direction = parseInt(prev) > value ? "up" : "down";
		ref?.classList?.add(`slide-${direction}`);

		setTimeout(() => {
			callback(value);
			ref?.classList?.add(`slide-${direction}-done`);
			ref?.classList?.remove(`slide-${direction}`);
			setTimeout(() => {
				ref?.classList?.remove(`slide-${direction}-done`);
			}, 75);
		}, 200);
	}

	// Update the updated blocks.
	useEffect(() => {
		change(
			updatedRef.current,
			updated - disabledBlocksCount,
			setUpdatedTotal,
		);
	}, [updated]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		setTimeout(() => {
			mountedRef.current = true;
		}, 500);
	}, []);

	return (
		<div className="gbm-sidebar">
			<div
				className="gbm-cta gbm-cta-block-legend"
				aria-label={__("Current Block Status", "block-manager")}
			>
				<div className="gbm-cta-wrap">
					<div
						className="gbm-legend gbm-legend--total"
						title={`${total} ${__("Total Blocks", "block-manager")}`}
					>
						<div>
							<span>
								<strong>{total}</strong>
							</span>
						</div>
						{__("Blocks", "block-manager")}
					</div>
					<div
						className="gbm-legend gbm-legend--updated"
						title={
							updatedTotal === 1
								? `1 ${__("Updated Block Category", "block-manager")}`
								: `${updatedTotal} ${__(
										"Updated Block Categories",
										"block-manager",
								  )}`
						}
					>
						<div>
							<span>
								<strong ref={updatedRef} data-prev={updatedRef}>
									{updatedTotal}
								</strong>
							</span>
						</div>
						{__("Updated", "block-manager")}
					</div>
					{!!filtered && (
						<div
							className="gbm-legend gbm-legend--filtered"
							title={
								filtered === 1
									? `1 ${__(
											"Filtered Block Category",
											"block-manager",
									  )}`
									: `${filtered} ${__(
											"Filtered Block Categories",
											"block-manager",
									  )}`
							}
						>
							<div>
								<span>
									<strong>{filtered - filteredBlocksCount}</strong>
								</span>
							</div>
							{__("Filtered", "block-manager")}
						</div>
					)}
				</div>
			</div>
			<div className="gbm-cta">
				<h3>{__("Help", "block-manager")}</h3>
				<div className="gbm-cta-wrap">
					<p>
						{__(
							"The Block Manager Category Switcher provides functionality for updating the categories of WordPress blocks.",
							"block-manager",
						)}
					</p>
					<p>
						{__(
							"Modifying a category will update the blocks location in the Block Inserter while editing posts.",
							"block-manager",
						)}
					</p>
					<Search callback={search} />
				</div>
			</div>
		</div>
	);
}
