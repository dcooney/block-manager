<?php
/**
 * Custom API route.
 *
 * @since 1.0
 */
add_action( 'rest_api_init', function () {
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
});

/**
 * Switch the category of a Gutenberg block.
 *
 * @param WP_REST_Request $request The content of the HTTP request.
 * @return json
 * @since 1.0
 */
function block_manager_category_switch( WP_REST_Request $request ) {

	if ( is_user_logged_in() && current_user_can( apply_filters( 'block_manager_user_role', 'activate_plugins' ) ) ) {

		error_reporting( E_ALL | E_STRICT );

		// Get JSON Data.
		$body = json_decode( $request->get_body(), true ); // Get contents of request body.
		$data = json_decode( $body['data'] ); // Get contents of data.

		if ( $body && $data ) {

			$block = ( $data && $data->block ) ? $data->block : '';
			$cat   = ( $data && $data->cat ) ? $data->cat : '';

			// Get current options.
			$options = (array) get_option( BLOCK_MANAGER_CATEGORIES, array() );

			// Remove duplicates.
			$duplicate = false;
			if ( $options ) {
				// Loop all current options.
				foreach ( $options as $index => $item ) {
					// Duplicate found.
					if ( $block === $item['block'] ) {
						$duplicate = true;
						$options[ $index ][ 'cat' ] = $cat;
					}
				}
			}

			// Create array of new data.
			$item = array(
				'block' => $block,
				'cat'   => $cat
			);

			// Add $object to array.
			if ( ! $duplicate ) {
				$options[] = $item;
			}

			// Update WP Options table.
			update_option( BLOCK_MANAGER_CATEGORIES, $options );

			// Send Response.
			$response = array(
				'success' => true,
				'msg'     => $block . __(' category updated to successfully to ', 'block-manager') . $cat . '.'
			);
		} else {

			$response = array(
				'success' => false,
				'msg'     => __( 'Error accessing API data.', 'block-manager' ),
			);
		}
		wp_send_json( $response ); // Send response as JSON.
	}
}
