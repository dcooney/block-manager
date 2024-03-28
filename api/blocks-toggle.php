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

		if ( $body ) {
			$block           = $body['block'] ? sanitize_text_field($body['block']) : ''; // block name.
			$title           = $body['title'] ? sanitize_text_field($body['title']) : ''; // block title.
			$type            = $body['type'] ? sanitize_text_field( $body['type']) : 'enable'; // enable/disable.
			$disabled_blocks = GBM_Blocks::gbm_get_disabled_blocks(); // Get disabled blocks.

			if ( ! $block ) {
				wp_send_json(
					[
						'success' => false,
						'msg'     => __( 'Unable to update block.', 'block-manager' ),
					]
				);
			}

			// Disable.
			if ( $type === 'disable' ) {
				if ( ! in_array( $block, $disabled_blocks, true ) ) {
					$disabled_blocks[] = $block;
				}

				$disabled_blocks = array_values( $disabled_blocks );
				update_option( BLOCK_MANAGER_OPTION, $disabled_blocks );
				wp_send_json(
					[
						'success'         => true,
						// translators: %s: The block title.
						'msg'             => sprintf( __( '%s block disabled', 'block-manager' ), '<strong>' . $title . '</strong>' ),
						'disabled_blocks' => $disabled_blocks,
					]
				);
			}

			// Enable.
			if ( $type === 'enable' ) {
				$blocks = [];

				// Loop all blocks and remove the specific block to be enabled.
				foreach ( $disabled_blocks as $disabled_block ) {
					if ( $block !== $disabled_block ) {
						$blocks[] = $disabled_block;
					}
				}

				$blocks = array_values( $blocks );
				update_option( BLOCK_MANAGER_OPTION, $blocks );
				wp_send_json(
					[
						'success'         => true,
						// translators: %s: The block title.
						'msg'             => sprintf( __( '%s block enabled', 'block-manager' ), '<strong>' . $title . '</strong>' ),
						'disabled_blocks' => $blocks,
					]
				);
			}
		} else {
			wp_send_json(
				[
					'success'         => false,
					'msg'             => __( 'Error accessing API data.', 'block-manager' ),
					'disabled_blocks' => [],
				]
			);
		}
	}
}
