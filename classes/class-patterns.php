<?php
/**
 * This file contains Patterns functions.
 *
 * @package blockmanager.
 */

/**
 * Block Manager Patterns class.
 *
 * @author ConnektMedia
 * @since 1.0
 */
class GBM_Patterns {

	/**
	 * Construct method.
	 *
	 * @author ConnektMedia
	 */
	public function __construct() {
		add_action( 'init', [ $this, 'gbm_unregister_patterns' ] );
		add_action( 'after_setup_theme', [ $this, 'gbm_remove_core_patterns' ] );

		// Disable remote patterns.
		if( in_array ( 'gbm/remote-patterns', self::gbm_get_all_disabled_patterns() ) ) {
			add_filter( 'should_load_remote_block_patterns', '__return_false' );
		}
	}

	/**
	 * Remove core patterns.
	 *
	 * @return void
	 */
	public function gbm_remove_core_patterns() {
		if( in_array ( 'gbm/core-patterns', self::gbm_get_all_disabled_patterns() ) ) {
			remove_theme_support( 'core-block-patterns' );
		}
	}

	/**
	 * Unregister block patterns.
	 *
	 * @return void
	 */
	public function gbm_unregister_patterns() {
		if( ! class_exists( 'WP_Block_Patterns_Registry' ) || ! function_exists( 'unregister_block_pattern' ) || ( isset( $_GET ) && isset( $_GET['page'] ) && $_GET['page'] === 'block-manager' ) ) {
			return; // Exit if current page is block manager.
		}

		$patterns = WP_Block_Patterns_Registry::get_instance()->get_all_registered();
		if ( ! empty ( $patterns ) ) {
			$pattern_names     = wp_list_pluck( $patterns, 'name' ); // Pluck pattern names.
			$disabled_patterns = self::gbm_get_all_disabled_patterns();

			if ( $disabled_patterns ) {
				foreach ( $disabled_patterns as $pattern ) {
					if ( in_array( $pattern, $pattern_names ) ) {
						@unregister_block_pattern( $pattern );
					}
				}
			}
		}
	}

	/**
	 * Get all patterns.
	 *
	 * @author ConnektMedia
	 * @since 1.2
	 * @return array
	 */
	public static function gbm_get_all_patterns() {
		if ( ! class_exists( 'WP_Block_Patterns_Registry' ) ) {
			return;
		}

		$patterns          = WP_Block_Patterns_Registry::get_instance()->get_all_registered();
		$categories        = WP_Block_Pattern_Categories_Registry::get_instance()->get_all_registered();
		$disabled_patterns = self::gbm_get_all_disabled_patterns();

		// Loop pattern categories and add to formatted array.
		$formatted = [];
		foreach( $categories as $category ) {
			$formatted[$category['name']] = [
				'label'       => isset( $category['label'] ) ? $category['label'] : '',
				'name'        => isset( $category['name'] ) ? $category['name'] : '',
				'description' => isset( $category['description'] ) ? $category['description'] : '',
				'patterns' => []
			];
		}

		// Loop patterns and add to formatted array under each category.
		foreach( $patterns as $pattern ) {
			if ( empty( $pattern['title']) ) {
				continue; // Exit if pattern title is empty.
			}

			if( isset( $pattern['categories'] ) && !empty( $pattern['categories'] ) ) {
				$category = $pattern['categories'][0];
				$formatted[$category]['patterns'][] = $pattern;
			} else {
				// Add uncategorized patterns to 'uncategorized' category.
				if ( !in_array( 'gbm/uncategorized-patterns', $disabled_patterns ) ) {
					$formatted['uncategorized']['patterns'][] = $pattern;
				}
			}
		}

		// Remove empty pattern categories.
		foreach( $formatted as $key => $value ) {
			if( empty( $value['patterns'] ) ) {
				unset( $formatted[$key] );
			}
		}

		// Create uncategorized category if not set.
		if ( isset( $formatted['uncategorized'] ) ) {
			$formatted['uncategorized']['label'] = __( 'Uncategorized', 'block-manager' );
			$formatted['uncategorized']['name'] = 'Uncategorized';
		}

		return $formatted;
	}

	/**
	 * Get all disabled patterns.
	 *
	 * @author ConnektMedia
	 * @since 3.0
	 * @return array
	 */
	public static function gbm_get_disabled_patterns() {
		$patterns = get_option( BLOCK_MANAGER_PATTERNS, [] );
		return ! empty( $patterns ) ? array_values( $patterns ) : [];
	}

	/**
	 * Get all filtered patterns.
	 *
	 * @author ConnektMedia
	 * @since 3.0
	 * @return array
	 */
	public static function gbm_get_filtered_patterns() {
		$patterns = apply_filters( 'gbm_disabled_patterns', [] ); // Get filtered block patterns.
		return ! empty( $patterns ) ? array_values( $patterns ) : [];
	}

	/**
	 * Get all disabled patterns.
	 *
	 * @author ConnektMedia
	 * @since 3.0
	 * @return array
	 */
	public static function gbm_get_all_disabled_patterns() {
		$disabled = self::gbm_get_disabled_patterns();
		$filtered = self::gbm_get_filtered_patterns();
		$patterns = array_merge( $disabled, $filtered );
		return ! empty( $patterns ) ? $patterns : [];
	}
}
new GBM_Patterns();
