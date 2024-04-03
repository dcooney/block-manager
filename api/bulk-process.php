<?php
/**
 * API Route: Bulk updater of blocks and patterns.
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
 * Bulk Enable/Disable block patterns.
 *
 * @param WP_REST_Request $request The content of the HTTP request.
 * @since 1.0
 */
function block_manager_bulk_process( WP_REST_Request $request ) {
	if ( is_user_logged_in() && current_user_can( apply_filters( 'block_manager_user_role', 'activate_plugins' ) ) ) {
		error_reporting( E_ALL | E_STRICT ); // @codingStandardsIgnoreLine

		$body = json_decode( $request->get_body(), true ); // Get contents of request body.

		if ( $body ) {
			$blocks_array = $body['blocks'] ? $body['blocks'] : []; // Item array.
			$type         = $body['type'] ? sanitize_text_field( $body['type'] ) : 'blocks';
			$direction    = $body['direction'] ? sanitize_text_field( $body['direction'] ) : 'enable'; // enable/disable.

			switch( $type ) {
				case 'blocks' :
					$disabled = GBM_Blocks::gbm_get_disabled_blocks();
					$filtered = GBM_Blocks::gbm_get_filtered_blocks();
					$disabled_msg = __( 'All blocks in category disabled', 'block-manager' );
					$enabled_msg = __( 'All blocks in category enabled', 'block-manager' );
					$option = BLOCK_MANAGER_OPTION;
					break;

				case 'patterns' :
					$disabled = GBM_Patterns::gbm_get_disabled_patterns();
					$filtered = GBM_Patterns::gbm_get_filtered_patterns();
					$disabled_msg = __( 'All patterns in category disabled', 'block-manager' );
					$enabled_msg = __( 'All patterns in category enabled', 'block-manager' );
					$option = BLOCK_MANAGER_PATTERNS;
					break;
			}

			if ( ! $option ) {
				wp_send_json(
					[
						'success' => false,
						'msg'     => __( 'Error accessing data', 'block-manager' ),
						'disabled' => [],
					]
				);
			}

			// Disable All.
			if ( ! empty( $blocks_array ) && $direction === 'disable' ) {
				// Loop blocks, add new blocks to disabled block array.
				// Only add if they are not being filtered via `gbm_disabled_blocks`.
				foreach ( $blocks_array as $block ) {
					if ( ! in_array( $block, $disabled, true ) && ! in_array( $block, $filtered, true ) ) {
						$disabled[] = $block;
					}
				}

				$disabled = array_values( $disabled );
				update_option( $option, $disabled );

				wp_send_json(
					[
						'success'  => true,
						'msg'      => $disabled_msg,
						'disabled' => $disabled,
					]
				);
			}

			// Enable All.
			if ( ! empty( $blocks_array ) && $direction === 'enable' ) {
				$blocks = [];
				// Loop blocks, create new array minus the blocks to enable.
				foreach ( $disabled as $block ) {
					if ( ! in_array( $block, $blocks_array, true ) && ! in_array( $block, $filtered, true ) ) {
						$blocks[] = $block;
					}
				}

				$blocks = array_values( $blocks );
				update_option( $option, $blocks );
				wp_send_json(
					[
						'success'  => true,
						'msg'      => $enabled_msg,
						'disabled' => $blocks,
					]
				);
			}
		} else {
			wp_send_json(
				[
					'success'         => false,
					'msg'             => __( 'Error accessing API data', 'block-manager' ),
					'disabled' => [],
				]
			);
		}
	}
}
