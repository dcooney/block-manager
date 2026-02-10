<?php
/**
 * API Route: Find posts that contain a specific block.
 *
 * @since 3.3.0
 * @package blockmanager
 */

add_action(
	'rest_api_init',
	function () {
		$my_namespace = 'gbm';
		$my_endpoint  = '/block_finder';
		register_rest_route(
			$my_namespace,
			$my_endpoint,
			array(
				'methods'             => 'POST',
				'callback'            => 'block_manager_block_finder',
				'permission_callback' => function () {
					return Gutenberg_Block_Manager::has_access();
				},
			)
		);
	}
);

/**
 * Find all posts containing a specific block type.
 *
 * @param WP_REST_Request $request The API request data.
 * @since 3.3.0
 */
function block_manager_block_finder( WP_REST_Request $request ) {
	if ( is_user_logged_in() && current_user_can( apply_filters( 'block_manager_user_role', 'activate_plugins' ) ) ) {
		global $wpdb;

		$body = json_decode( $request->get_body(), true );

		if ( ! $body || empty( $body['block'] ) ) {
			wp_send_json(
				[
					'success' => false,
					'msg'     => __( 'A block name is required.', 'block-manager' ),
				]
			);
		}

		$block    = sanitize_text_field( $body['block'] );
		$page     = isset( $body['page'] ) ? absint( $body['page'] ) : 1;
		$per_page = 20;
		$offset   = ( $page - 1 ) * $per_page;

		// Strip 'core/' prefix since WP stores core blocks without it.
		// e.g. core/paragraph is stored as <!-- wp:paragraph --> in post_content.
		$block_name = preg_replace( '/^core\//', '', $block );

		// Check transient cache.
		$cache_key = 'gbm_finder_' . md5( $block_name . '_' . $page );
		$cached    = get_transient( $cache_key );

		if ( false !== $cached ) {
			wp_send_json( $cached );
			return;
		}

		// Get all public post types.
		$post_types    = get_post_types( [ 'public' => true ], 'names' );
		$post_types    = array_values( $post_types );
		$placeholders  = implode( ', ', array_fill( 0, count( $post_types ), '%s' ) );

		// Build the LIKE pattern for the block comment.
		// Matches: <!-- wp:blockname --> and <!-- wp:blockname {attrs} --> and <!-- wp:blockname /-->
		$like_pattern = '%<!-- wp:' . $wpdb->esc_like( $block_name ) . '%';

		// Count total results.
		// phpcs:disable WordPress.DB.PreparedSQL.InterpolatedNotPrepared
		$count_query = $wpdb->prepare(
			"SELECT COUNT(DISTINCT ID) FROM {$wpdb->posts}
			WHERE post_status = 'publish'
			AND post_type IN ($placeholders)
			AND post_content LIKE %s",
			array_merge( $post_types, [ $like_pattern ] )
		);
		$total = (int) $wpdb->get_var( $count_query );

		// Get paginated results.
		$results_query = $wpdb->prepare(
			"SELECT ID, post_title, post_type FROM {$wpdb->posts}
			WHERE post_status = 'publish'
			AND post_type IN ($placeholders)
			AND post_content LIKE %s
			ORDER BY post_date DESC
			LIMIT %d OFFSET %d",
			array_merge( $post_types, [ $like_pattern, $per_page, $offset ] )
		);
		$results = $wpdb->get_results( $results_query );
		// phpcs:enable WordPress.DB.PreparedSQL.InterpolatedNotPrepared

		$posts = [];
		if ( $results ) {
			foreach ( $results as $post ) {
				$posts[] = [
					'id'       => (int) $post->ID,
					'title'    => $post->post_title ? $post->post_title : __( '(no title)', 'block-manager' ),
					'type'     => $post->post_type,
					'edit_url' => get_edit_post_link( $post->ID, 'raw' ),
				];
			}
		}

		$response = [
			'success'  => true,
			'posts'    => $posts,
			'total'    => $total,
			'page'     => $page,
			'per_page' => $per_page,
		];

		// Cache for 1 hour.
		set_transient( $cache_key, $response, HOUR_IN_SECONDS );

		wp_send_json( $response );
	}
}

/**
 * Clear Block Finder transient cache when a post is saved or deleted.
 *
 * @since 3.3.0
 */
function block_manager_clear_finder_cache() {
	global $wpdb;
	$wpdb->query( "DELETE FROM {$wpdb->options} WHERE option_name LIKE '_transient_gbm_finder_%' OR option_name LIKE '_transient_timeout_gbm_finder_%'" ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery
}
add_action( 'save_post', 'block_manager_clear_finder_cache' );
add_action( 'delete_post', 'block_manager_clear_finder_cache' );
add_action( 'wp_trash_post', 'block_manager_clear_finder_cache' );
