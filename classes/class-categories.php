<?php
/**
 * This file contains Categories functions.
 *
 * @package blockmanager.
 */

/**
 * Block Manager Categories class.
 *
 * @author ConnektMedia
 * @since 1.0
 */
class GBM_Categories {

	/**
	 * Get all updated categories.
	 *
	 * @author ConnektMedia
	 * @since 1.2
	 * @return array
	 */
	public static function gbm_get_block_categories() {
		$categories = get_option( BLOCK_MANAGER_CATEGORIES, [] ); // Get option.
		return $categories ? array_values( $categories ) : [];
	}

	/**
	 * Get all filtered categories.
	 *
	 * @author ConnektMedia
	 * @since 2.0
	 * @return array
	 */
	public static function gbm_get_filtered_categories() {
		$blocks = apply_filters( 'gbm_block_categories', [] ); // Get filtered block categories.
		return ! empty( $blocks ) ? array_values( $blocks ) : [];
	}

	/**
	 * Get all block categories.
	 *
	 * @author ConnektMedia
	 * @since 2.0
	 * @return array
	 */
	public static function gbm_get_all_block_categories() {
		$updated  = self::gbm_get_block_categories();
		$filtered = self::gbm_get_filtered_categories();
		$blocks   = array_merge( $updated, $filtered );
		return ! empty( $blocks ) ? $blocks : [];
	}

	/**
	 * Remove any duplicate block categories when using category hook.
	 *
	 * @param array $options  The categories from WP options.
	 * @param array $filtered The filtered categories.
	 * @return array          Modified options.
	 */
	public static function gbm_remove_duplicate_categories( $options, $filtered ) {
		if ( $options && $filtered ) {
			$updated = false;
			foreach ( $filtered as $filter ) {
				// Search array for filtered category.
				$key = array_search( $filter['block'], array_column( $options, 'block' ), true );
				if ( $key !== false ) {
					unset( $options[ $key ] ); // Remove filtered item from array.
					$options = array_values( $options ); // Reset array keys.
					$updated = true;
				}
			}
			if ( $updated ) {
				update_option( BLOCK_MANAGER_CATEGORIES, $options );
			}
		}

		return array_values( $options );
	}
}
new GBM_Categories();
