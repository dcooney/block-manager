<?php
/**
 * API Route: Export block settings as PHP.
 *
 * @since 1.0
 * @package blockmanager
 */

add_action(
	'rest_api_init',
	function () {
		$my_namespace = 'gbm';
		$my_endpoint  = '/export';
		register_rest_route(
			$my_namespace,
			$my_endpoint,
			array(
				'methods'             => 'GET',
				'callback'            => 'block_manager_export',
				'permission_callback' => function () {
					return Gutenberg_Block_Manager::has_access();
				},
			)
		);
	}
);

/**
 * Export disabled blocks as an erray.
 *
 * @param WP_REST_Request $request The API request data.
 * @since 1.0
 */
function block_manager_export( WP_REST_Request $request ) {
	if ( is_user_logged_in() && current_user_can( apply_filters( 'block_manager_user_role', 'activate_plugins' ) ) ) {
		$type = filter_input( INPUT_GET, 'type', @FILTER_SANITIZE_STRING ); // phpcs:ignore

		switch($type) {
			case 'blocks':
				$filtered_blocks = GBM_Blocks::gbm_get_filtered_blocks();
				$blocks          = GBM_Blocks::gbm_get_disabled_blocks();
				wp_send_json(
					[
						'success' => true,
						'code'    => wp_json_encode( array_merge( $blocks, $filtered_blocks ) ),
					]
				);
			break;

			case 'patterns':
				$filtered_patterns = GBM_Patterns::gbm_get_filtered_patterns();
				$patterns          = GBM_Patterns::gbm_get_disabled_patterns();
				wp_send_json(
					[
						'success' => true,
						'code'    => wp_json_encode( array_merge( $patterns, $filtered_patterns ) ),
					]
				);
			break;

			case 'categories':
				$filtered_categories = GBM_Categories::gbm_get_filtered_categories();
				$categories          = GBM_Categories::gbm_get_block_categories();
				wp_send_json(
					[
						'success' => true,
						'code'    => wp_json_encode( array_merge( $categories, $filtered_categories ) ),
					]
				);
			break;
		}

		wp_send_json(
			[
				'success' => false,
			]
		);

	} else {
		wp_send_json(
			[
				'success' => false,
				'msg'     => __(
					'Unatuhorized.',
					'block-manager'
				),
			]
		);
	}
}
