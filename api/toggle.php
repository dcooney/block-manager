<?php
/**
 * API Route: Toggle the active state of blocks.
 *
 * @since 1.0
 * @package blockmanager
 */

add_action(
	'rest_api_init',
	function () {
		$my_namespace = 'gbm';
		$my_endpoint  = '/toggle';
		register_rest_route(
			$my_namespace,
			$my_endpoint,
			array(
				'methods'             => 'POST',
				'callback'            => 'block_manager_toggle',
				'permission_callback' => function () {
					return Gutenberg_Block_Manager::has_access();
				},
			)
		);
	}
);

/**
 * Enable/Disable individual gutenberg blocks.
 *
 * @param WP_REST_Request $request The API request data.
 * @since 1.0
 */
function block_manager_toggle( WP_REST_Request $request ) {

	if ( is_user_logged_in() && current_user_can( apply_filters( 'block_manager_user_role', 'activate_plugins' ) ) ) {
		error_reporting( E_ALL | E_STRICT ); // @codingStandardsIgnoreLine

		// Get JSON Data.
		$body = json_decode( $request->get_body(), true ); // Get contents of request body.
		$data = json_decode( $body['data'] ); // Get contents of data.

		if ( $body && $data ) {
			$block           = $data && $data->block ? $data->block : ''; // block name.
			$type            = $data && $data->type ? $data->type : 'enable'; // enable/disable.
			$disabled_blocks = Gutenberg_Block_Manager::gbm_get_disabled_blocks(); // Get disabled blocks.

			// Disable.
			if ( $block && $type === 'disable' ) {
				if ( ! in_array( $block, $disabled_blocks, true ) ) {
					$disabled_blocks[] = $block;
				}

				update_option( BLOCK_MANAGER_OPTION, $disabled_blocks );
				$response = array(
					'success'         => true,
					'msg'             => __( 'Block Disabled', 'block-manager' ),
					'disabled_blocks' => $disabled_blocks,
				);
			}

			// Enable.
			if ( $block && $type === 'enable' ) {
				$blocks = [];

				// Loop all blocks and remove the specific block to be enabled.
				foreach ( $disabled_blocks as $disabled_block ) {
					if ( $block !== $disabled_block ) {
						$blocks[] = $disabled_block;
					}
				}

				update_option( BLOCK_MANAGER_OPTION, $blocks );
				$response = array(
					'success'         => true,
					'msg'             => __( 'Block enabled', 'block-manager' ),
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

		wp_send_json( $response );

	}
}
