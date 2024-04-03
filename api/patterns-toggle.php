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
		$my_endpoint  = '/pattern';
		register_rest_route(
			$my_namespace,
			$my_endpoint,
			array(
				'methods'             => 'POST',
				'callback'            => 'block_manager_pattern_toggle',
				'permission_callback' => function () {
					return Gutenberg_Block_Manager::has_access();
				},
			)
		);
	}
);

/**
 * Enable/Disable individual block patterns.
 *
 * @param WP_REST_Request $request The API request data.
 * @since 1.0
 */
function block_manager_pattern_toggle( WP_REST_Request $request ) {
	if ( is_user_logged_in() && current_user_can( apply_filters( 'block_manager_user_role', 'activate_plugins' ) ) ) {
		error_reporting( E_ALL | E_STRICT ); // @codingStandardsIgnoreLine

		// Get JSON Data.
		$body = json_decode( $request->get_body(), true ); // Get contents of request body.

		if ( $body ) {
			$pattern           = $body['pattern'] ? sanitize_text_field($body['pattern']) : ''; // pattern name.
			$title             = $body['title'] ? sanitize_text_field($body['title']) : ''; // pattern title.
			$type              = $body['type'] ? sanitize_text_field( $body['type']) : 'enable'; // enable/disable.
			$disabled_patterns = GBM_Patterns::gbm_get_disabled_patterns(); // Get disabled patterns.

			if ( ! $pattern ) {
				wp_send_json(
					[
						'success' => false,
						'msg'     => __( 'Unable to update pattern.', 'block-manager' ),
					]
				);
			}

			// Disable.
			if ( $type === 'disable' ) {
				if ( ! in_array( $pattern, $disabled_patterns, true ) ) {
					$disabled_patterns[] = $pattern;
				}

				$disabled_patterns = array_values( $disabled_patterns );
				update_option( BLOCK_MANAGER_PATTERNS, $disabled_patterns );
				wp_send_json(
					[
						'success'           => true,
						// translators: %s: The block title.
						'msg'               => sprintf( __( '%s pattern disabled', 'block-manager' ), '<strong>' . $title . '</strong>' ),
						'disabled_patterns' => $disabled_patterns,
					]
				);
			}

			// Enable.
			if ( $type === 'enable' ) {
				$patterns = [];

				// Loop all blocks and remove the specific pattern to be enabled.
				foreach ( $disabled_patterns as $disabled_pattern ) {
					if ( $pattern !== $disabled_pattern ) {
						$patterns[] = $disabled_pattern;
					}
				}

				$patterns = array_values( $patterns );
				update_option( BLOCK_MANAGER_PATTERNS, $patterns );
				wp_send_json(
					[
						'success'           => true,
						// translators: %s: The pattern title.
						'msg'               => sprintf( __( '%s pattern enabled', 'block-manager' ), '<strong>' . $title . '</strong>' ),
						'disabled_patterns' => $patterns,
					]
				);
			}
		} else {
			wp_send_json(
				[
					'success'           => false,
					'msg'               => __( 'Error accessing API data.', 'block-manager' ),
					'disabled_patterns' => [],
				]
			);
		}
	}
}
