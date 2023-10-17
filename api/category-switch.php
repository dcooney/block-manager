<?php
/**
 * API Route: Switch a category.
 *
 * @since 1.2
 * @package blockmanager
 */

add_action(
	'rest_api_init',
	function () {
		$my_namespace = 'gbm';
		$my_endpoint  = '/category_switch';
		register_rest_route(
			$my_namespace,
			$my_endpoint,
			array(
				'methods'             => 'POST',
				'callback'            => 'block_manager_category_switch',
				'permission_callback' => function () {
					return Gutenberg_Block_Manager::has_access();
				},
			)
		);
	}
);

/**
 * Switch the category of a Gutenberg block.
 *
 * @param WP_REST_Request $request The content of the HTTP request.
 * @since 1.0
 */
function block_manager_category_switch( WP_REST_Request $request ) {
	if ( is_user_logged_in() && current_user_can( apply_filters( 'block_manager_user_role', 'activate_plugins' ) ) ) {
		error_reporting( E_ALL | E_STRICT ); // @codingStandardsIgnoreLine

		// Get JSON Data.
		$body = json_decode( $request->get_body(), true ); // Get contents of request body.

		if ( ! $body ) {
			wp_send_json(
				[
					'success'    => false,
					'msg'        => __( 'Error accessing API data.', 'block-manager' ),
					'categories' => false,
				]
			);
		}

		$type     = $body['type'] ? $body['type'] : 'add';
		$block    = $body['block'] ? $body['block'] : '';
		$category = $body['category'] ? $body['category'] : '';

		// Get current options.
		$options = (array) get_option( BLOCK_MANAGER_CATEGORIES, [] );

		if ( $type === 'remove' ) {
			// Remove category.
			foreach ( $options as $index => $item ) {
				// Duplicate found.
				if ( $block === $item['block'] ) {
					unset( $options[ $index ] );
					$options = array_values( $options );  // Reset array keys.
					break;
				}
			}
		} else {
			$duplicate = false;

			// Remove duplicates.
			if ( $options ) {
				// Loop all current options.
				foreach ( $options as $index => $item ) {
					// Duplicate found.
					if ( $block === $item['block'] ) {
						$duplicate                = true;
						$options[ $index ]['cat'] = $category;
					}
				}
			}

			// Add item to array.
			if ( ! $duplicate ) {
				$options[] = [
					'block' => $block,
					'cat'   => $category,
				];
			}
		}

		// Update WP Options table.
		update_option( BLOCK_MANAGER_CATEGORIES, $options );

		// Send Response.
		wp_send_json(
			[
				'success'    => true,
				'msg'        => __( 'Block category updated successfully.', 'block-manager' ),
				'categories' => $options,
			]
		);

	}
}
