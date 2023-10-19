import axios from "axios";

/**
 * Export as PHP code.
 *
 * @param {Element} ref  The export modal reference.
 * @param {string}  type The type of export.
 */
export function exportHook(ref, type = "blocks") {
	ref?.classList.add("active"); // Loading state.

	const hook =
		type === "blocks" ? "gbm_disabled_blocks" : "gbm_block_categories";

	axios({
		method: "GET",
		url: `${gbm_localize.root}gbm/export/?type=${type}`,
		headers: {
			"X-WP-Nonce": gbm_localize.nonce,
			"Content-Type": "application/json",
		},
	})
		.then(function (res) {
			const { data, status } = res;
			if (status === 200 && data?.success && data?.code) {
				let code = "";

				// Blocks return data.
				if (type === "blocks") {
					code = data.code;
					code = code.replace(/\\/g, ""); // Replace `\`.
					code = code.replace(/"/g, "'"); // Replace `"`.
					code = code.replace(/,'/g, ", '"); // Replace `,'`.
				}

				// Category return data.
				if (type === "categories") {
					const entries = JSON.parse(data.code);
					if (entries?.length) {
						code = "[";
						entries.forEach((entry, index) => {
							code += "[";
							code += `'block' => '${entry.block}', 'cat' => '${entry.cat}'`;
							code += "]";
							code += index === entries.length - 1 ? "" : ", ";
						});
						code += "]";
					}
				}

				const results = `// functions.php<br/>add_filter( '${hook}', function() {<br/>&nbsp;&nbsp;&nbsp;return ${code};<br/>});`;
				const target = ref?.querySelector("#gbm-export");
				target.innerHTML = results;
				setTimeout(function () {
					target.focus();
				}, 250);
			} else {
				console.warn(
					__("There was an error fetching export data.", "block-manager"),
				);
				ref?.classList.remove("active");
			}
		})
		.catch(function (error) {
			console.warn(error);
			ref?.classList.remove("active");
		});
}
