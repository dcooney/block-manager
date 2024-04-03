<?php
/**
 * Uninstall Block Manager
 * Deletes all the plugin options when plugin is unistalled.
 *
 * @since 1.2.2
 * @package Gutenberg_Block_Manager
 */

if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	exit;
}
// Delete option: Blocks.
delete_option( 'gbm_disabled_blocks' );

// Delete option: Categories.
delete_option( 'gbm_categories' );

// Delete option: Patterns.
delete_option( 'gbm_disabled_patterns' );
