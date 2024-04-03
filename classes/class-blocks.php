<?php
/**
 * This file contains Blocks functions.
 *
 * @package blockmanager.
 */

/**
 * Block Manager Blocks class.
 *
 * @author ConnektMedia
 * @since 1.0
 */
class GBM_Blocks {

	/**
	 * Get all disabled blocks.
	 *
	 * @author ConnektMedia
	 * @since 1.0
	 * @return array
	 */
	public static function gbm_get_disabled_blocks() {
		$blocks = get_option( BLOCK_MANAGER_OPTION, [] ); // Get disabled blocks.
		return ! empty( $blocks ) ? array_values( $blocks ) : [];
	}

	/**
	 * Get all filtered blocks.
	 *
	 * @author ConnektMedia
	 * @since 1.1
	 * @return array
	 */
	public static function gbm_get_filtered_blocks() {
		$blocks = apply_filters( 'gbm_disabled_blocks', [] ); // Get filtered disabled blocks.
		return ! empty( $blocks ) ? array_values( $blocks ) : [];
	}

	/**
	 * Get all disabled blocks.
	 *
	 * @author ConnektMedia
	 * @since 1.0
	 * @return array
	 */
	public static function gbm_get_all_disabled_blocks() {
		$disabled = self::gbm_get_disabled_blocks();
		$filtered = self::gbm_get_filtered_blocks();
		$blocks   = array_merge( $disabled, $filtered );
		return ! empty( $blocks ) ? $blocks : [];
	}

	/**
	 * Remove any duplicate blocks when using blocks hook.
	 *
	 * @param array $options  The blocks from WP options.
	 * @param array $filtered The filtered blocks.
	 * @return array          Modified options.
	 */
	public static function gbm_remove_duplicate_blocks( $options, $filtered ) {
		if ( $options && $filtered ) {
			$updated = false;
			foreach ( $filtered as $filter ) {
				// Search array for filtered block.
				$key = array_search( $filter, $options, true );
				if ( $key !== false ) {
					unset( $options[ $key ] ); // Remove filtered item from array.
					$options = array_values( $options ); // Reset array keys.
					$updated = true;
				}
			}
			if ( $updated ) {
				update_option( BLOCK_MANAGER_OPTION, $options );
			}
		}
		return array_values( $options );
	}
}
new GBM_Blocks();
