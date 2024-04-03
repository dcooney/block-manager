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
		$my_endpoint  = '/category_update';
		register_rest_route(
			$my_namespace,
			$my_endpoint,
			array(
				'methods'             => 'POST',
				'callback'            => 'block_manager_category_update',
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
function block_manager_category_update( WP_REST_Request $request ) {
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
		$title    = $body['title'] ? $body['title'] : '';
		$category = $body['category'] ? $body['category'] : '';

		$options = GBM_Categories::gbm_get_block_categories(); // Get block categories.

		if ( $type === 'remove' ) {
			// Remove block category.
			foreach ( $options as $index => $item ) {
				// Duplicate found.
				if ( $block === $item['block'] ) {
					unset( $options[ $index ] );
					$options = array_values( $options );  // Reset array keys.
					break;
				}
			}
		} else {
			// Add block category.
			$duplicate = false;

			// Remove duplicates if required.
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

		$options = array_values( $options );

		// Update WP Options table.
		update_option( BLOCK_MANAGER_CATEGORIES, $options );

		// Send Response.
		wp_send_json(
			[
				'success'    => true,
				// translators: %s: The block title.
				'msg'        => sprintf( __( '%s category updated', 'block-manager' ), '<strong>' . $title . '</strong>' ),
				'categories' => $options,
			]
		);

	}
}
