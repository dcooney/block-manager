<?php
/**
 * Plugin Name: Block Manager
 * Plugin URI: https://connekthq.com/plugins/block-manager/
 * Description: Take control of your WordPress blocks.
 * Text Domain: block-manager
 * Author: Darren Cooney
 * Author URI: https://connekthq.com
 * Version: 2.0.0
 * License: GPL
 * Copyright: Darren Cooney & Connekt Media
 *
 * @package blockmanager
 */

/*
* NEW: Added block category export and hook `gbm_block_categories` to allow for changing block categories at the theme level.


TODO:
- Update Readme.txt
- Add new screenshots.

*/

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'BLOCK_MANAGER_VERSION', '2.0.0' );
define( 'BLOCK_MANAGER_RELEASE', 'October 20, 2023' );
define( 'BLOCK_MANAGER_DIR_PATH', plugin_dir_path( __FILE__ ) );
define( 'BLOCK_MANAGER_OPTION', 'gbm_disabled_blocks' );
define( 'BLOCK_MANAGER_CATEGORIES', 'gbm_categories' );

/**
 * Block Manager Class.
 *
 * @since 1.0
 */
class Gutenberg_Block_Manager {

	/**
	 * Block Manager Instance variable.
	 *
	 * @var $instance
	 * @since 1.0
	 */
	private static $instance = null;


	/**
	 * Define the Block Manager Instance
	 *
	 * @author ConnektMedia
	 * @since 1.0
	 * @return self
	 */
	public static function instance() {
		if ( null === self::$instance ) {
			self::$instance = new Gutenberg_Block_Manager();
		}
		return self::$instance;
	}


	/**
	 * Initialize plugin.
	 *
	 * @author ConnektMedia
	 * @since 1.0
	 */
	private function __construct() {
		add_action( 'enqueue_block_editor_assets', [ $this, 'gbm_enqueue' ] );
		load_plugin_textdomain( 'block-manager', false, dirname( plugin_basename( __FILE__ ) ) . '/lang' );
		add_filter( 'plugin_action_links_' . plugin_basename( __FILE__ ), [ &$this, 'gbm_action_links' ] );
		add_filter( 'admin_footer_text', [ &$this, 'gbm_filter_admin_footer_text' ] );
		require_once BLOCK_MANAGER_DIR_PATH . 'class-admin.php';
		require_once 'api/blocks-reset.php';
		require_once 'api/bulk-process.php';
		require_once 'api/category-reset.php';
		require_once 'api/category-switch.php';
		require_once 'api/export.php';
		require_once 'api/toggle.php';
		require_once 'includes/connekt-plugin-installer/class-connekt-plugin-installer.php';
	}

	/**
	 * Enqueue the scripts.
	 *
	 * @author ConnektMedia
	 * @since 1.0
	 */
	public function gbm_enqueue() {
		$screen = get_current_screen();
		// Don't load Block Manager on Widget screen.
		if ( $screen->id === 'widgets' ) {
			// Note: GBM throws an error around `_wpLoadBlockEditor` being not available on the screen.
			// TODO: Investigate how the widgets screen loads the block editor.
			return;
		}

		$wp_asset_file = require BLOCK_MANAGER_DIR_PATH . 'build/block-manager.asset.php'; // Get webpack asset file.

		wp_enqueue_script(
			'block-manager',
			plugins_url( 'build/block-manager.js', __FILE__ ),
			$wp_asset_file['dependencies'],
			BLOCK_MANAGER_VERSION,
			false
		);
		wp_localize_script(
			'block-manager',
			'gutenberg_block_manager',
			[
				'blocks'     => $this->gbm_get_all_disabled_blocks(),
				'categories' => $this->gbm_get_all_block_categories(),
			]
		);
	}

	/**
	 * Get all filtered categories.
	 *
	 * @author ConnektMedia
	 * @since 1.2
	 * @return array
	 */
	public static function gbm_get_block_categories() {
		$categories = get_option( BLOCK_MANAGER_CATEGORIES, [] ); // Get option.
		return $categories ? $categories : [];
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
		return ! empty( $blocks ) ? $blocks : [];
	}

	/**
	 * Get all disabled blocks.
	 *
	 * @author ConnektMedia
	 * @since 1.0
	 * @return array
	 */
	public static function gbm_get_all_block_categories() {
		$updated  = self::gbm_get_block_categories();
		$filtered = self::gbm_get_filtered_categories();
		$blocks   = array_merge( $updated, $filtered );
		return ! empty( $blocks ) ? $blocks : [];
	}

	/**
	 * Get all disabled blocks.
	 *
	 * @author ConnektMedia
	 * @since 1.0
	 * @return array
	 */
	public static function gbm_get_disabled_blocks() {
		$blocks = get_option( BLOCK_MANAGER_OPTION, [] ); // Get disabled blocks.
		return ! empty( $blocks ) ? $blocks : [];
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
	 * Get all filtered blocks.
	 *
	 * @author ConnektMedia
	 * @since 1.1
	 * @return array
	 */
	public static function gbm_get_filtered_blocks() {
		$blocks = apply_filters( 'gbm_disabled_blocks', [] ); // Get filtered disabled blocks.
		return ! empty( $blocks ) ? $blocks : [];
	}

	/**
	 * Add plugin action links to WP plugin screen
	 *
	 * @author ConnektMedia
	 * @since 1.0
	 * @param array $links The action links.
	 * @return array
	 */
	public static function gbm_action_links( $links ) {
		$settings = '<a href="' . get_admin_url( null, 'options-general.php?page=block-manager' ) . '">' . __( 'Blocks', 'block-manager' ) . '</a>';
		$cats     = '<a href="' . get_admin_url( null, 'options-general.php?page=block-manager&category-switcher' ) . '">' . __( 'Block Categories', 'block-manager' ) . '</a>';
		array_unshift( $links, $settings, $cats );
		return $links;
	}

	/**
	 * Confirm user has access to Block Manager.
	 *
	 * @author ConnektMedia
	 * @since 1.1
	 * @return Boolean
	 */
	public static function has_access() {
		$access = false;
		if ( is_user_logged_in() && current_user_can( apply_filters( 'block_manager_user_role', 'activate_plugins' ) ) ) {
			$access = true;
		}
		return $access;
	}

	/**
	 * Filter the WP Admin footer text.
	 *
	 * @param string $text The footer display text.
	 * @author ConnektMedia
	 * @since 2.0
	 */
	public function gbm_filter_admin_footer_text( $text ) {
		$screen     = get_current_screen();
		$base_array = [
			'settings_page_block-manager',
		];

		if ( in_array( $screen->base, $base_array, true ) ) {
			$divider = '<em>|</em>';
			$love    = '<span style="color: #e25555;">♥</span>';
			echo wp_kses_post( 'Block Manager is made with ' . $love . ' by <a href="https://connekthq.com/?utm_source=WPAdmin&utm_medium=BlockManager&utm_campaign=Footer" target="_blank" style="font-weight: 500;">Connekt</a> ' . $divider . ' <a href="https://wordpress.org/support/plugin/block-manager/reviews/" target="_blank" style="font-weight: 500;">Leave Review</a> ' . $divider . ' <a href="https://wordpress.org/support/plugin/block-manager/" target="_blank" style="font-weight: 500;">Support</a>' );
		}
	}

}

/**
 * The main function for Gutenberg_Block_Manager_Init
 *
 * @author ConnektMedia
 * @since 1.0
 */
function gbm_init() {
	include_once ABSPATH . 'wp-admin/includes/plugin.php';
	if ( is_plugin_active( 'gutenberg/gutenberg.php' ) || version_compare( get_bloginfo( 'version' ), '4.9.9', '>' ) ) {
		Gutenberg_Block_Manager::instance();
	}
}
add_action( 'plugins_loaded', 'gbm_init', 100 );
