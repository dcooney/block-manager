<?php
/**
 * API Route: Bulk updater of block statuses.
 *
 * @since 1.0
 * @package blockmanager
 */

add_action(
	'rest_api_init',
	function () {
		$my_namespace = 'gbm';
		$my_endpoint  = '/bulk_process';
		register_rest_route(
			$my_namespace,
			$my_endpoint,
			array(
				'methods'             => 'POST',
				'callback'            => 'block_manager_bulk_process',
				'permission_callback' => function () {
					return Gutenberg_Block_Manager::has_access();
				},
			)
		);
	}
);

/**
 * Bulk Enable/Disable gutenberg blocks.
 *
 * @param WP_REST_Request $request The content of the HTTP request.
 * @since 1.0
 */
function block_manager_bulk_process( WP_REST_Request $request ) {

	if ( is_user_logged_in() && current_user_can( apply_filters( 'block_manager_user_role', 'activate_plugins' ) ) ) {

		error_reporting( E_ALL | E_STRICT ); // @codingStandardsIgnoreLine

		// Get JSON Data.
		$body = json_decode( $request->get_body(), true ); // Get contents of request body.
		$data = json_decode( $body['data'] ); // Get contents of data.

		if ( $body && $data ) {

			$blocks_array = $data && $data->blocks ? $data->blocks : []; // block array.
			$type         = $data && $data->type ? $data->type : 'enable'; // enable/disable.

			$disabled_blocks = Gutenberg_Block_Manager::gbm_get_disabled_blocks();
			$filtered_blocks = Gutenberg_Block_Manager::gbm_get_filtered_blocks();

			// Disable All.
			if ( ! empty( $blocks_array ) && $type === 'disable' ) {
				// Loop blocks, add new blocks to disabled block array.
				// Only add if they are not being filtered via `gbm_disabled_blocks`.
				foreach ( $blocks_array as $block ) {
					if ( ! in_array( $block, $disabled_blocks, true ) && ! in_array( $block, $filtered_blocks, true ) ) {
						$disabled_blocks[] = $block;
					}
				}

				// Update option.
				update_option( BLOCK_MANAGER_OPTION, $disabled_blocks );

				// Send response.
				$response = array(
					'success'         => true,
					'msg'             => __( 'All Blocks Disabled', 'block-manager' ),
					'disabled_blocks' => $disabled_blocks,
				);
			}

			// Enable All.
			if ( ! empty( $blocks_array ) && $type === 'enable' ) {
				$blocks = [];
				// Loop blocks, create new array minus the blocks to enable.
				foreach ( $disabled_blocks as $block ) {
					if ( ! in_array( $block, $blocks_array, true ) && ! in_array( $block, $filtered_blocks, true ) ) {
						$blocks[] = $block;
					}
				}

				// Update option.
				update_option( BLOCK_MANAGER_OPTION, $blocks );

				// Send response.
				$response = array(
					'success'         => true,
					'msg'             => __( 'All Blocks Enabled', 'block-manager' ),
					'disabled_blocks' => $blocks,
				);
			}
		} else {
			$response = array(
				'success'         => false,
				'msg'             => __( 'Error accessing API data.', 'block-manager' ),
				'disabled_blocks' => [],
			);
		}

		wp_send_json( $response ); // Send response as JSON.

	}
}
