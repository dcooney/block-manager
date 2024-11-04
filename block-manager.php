<?php
/**
 * Plugin Name: Block Manager
 * Plugin URI: https://connekthq.com/plugins/block-manager/
 * Description: Take control of your WordPress blocks and patterns.
 * Text Domain: block-manager
 * Author: Darren Cooney
 * Author URI: https://connekthq.com
 * Version: 3.1.0
 * License: GPL
 * Copyright: Darren Cooney & Connekt Media
 *
 * @package blockmanager
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'BLOCK_MANAGER_VERSION', '3.1.0' );
define( 'BLOCK_MANAGER_RELEASE', 'November 4, 2024' );
define( 'BLOCK_MANAGER_BASENAME', plugin_basename( __FILE__ ) );
define( 'BLOCK_MANAGER_DIR_PATH', plugin_dir_path( __FILE__ ) );
define( 'BLOCK_MANAGER_URL', plugins_url( '', __FILE__ ) );
define( 'BLOCK_MANAGER_OPTION', 'gbm_disabled_blocks' );
define( 'BLOCK_MANAGER_CATEGORIES', 'gbm_categories' );
define( 'BLOCK_MANAGER_PATTERNS', 'gbm_disabled_patterns' );

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

		require_once 'classes/class-admin.php';
		require_once 'classes/class-blocks.php';
		require_once 'classes/class-categories.php';
		require_once 'classes/class-patterns.php';
		require_once 'api/blocks-toggle.php';
		require_once 'api/blocks-reset.php';
		require_once 'api/category-reset.php';
		require_once 'api/category-update.php';
		require_once 'api/patterns-toggle.php';
		require_once 'api/patterns-reset.php';
		require_once 'api/bulk-process.php';
		require_once 'api/export.php';
		require_once 'includes/connekt-plugin-installer/class-connekt-plugin-installer.php';
	}

	/**
	 * Enqueue the scripts.
	 *
	 * @author ConnektMedia
	 * @since 1.0
	 */
	public function gbm_enqueue() {
		$screen        = get_current_screen();
		$wp_asset_file = require BLOCK_MANAGER_DIR_PATH . 'build/block-manager.asset.php'; // Get webpack asset file.
		$dependencies  = $wp_asset_file['dependencies'];

		// Update script dependencies based on current screen.
		if ( is_object( get_current_screen() ) ) {
			if ( $screen === 'site-editor' ) {
				$dependencies[] = 'wp-edit-site';
			} elseif ( $screen->id === 'widgets' ) {
				$dependencies[] = 'wp-edit-widgets';
			} else {
				$dependencies[] = 'wp-edit-post';
			}
		} else {
			$dependencies[] = 'wp-edit-post';
		}

		wp_enqueue_script(
			'block-manager',
			plugins_url( 'build/block-manager.js', __FILE__ ),
			$dependencies,
			BLOCK_MANAGER_VERSION,
			false
		);

		wp_localize_script(
			'block-manager',
			'gutenberg_block_manager',
			[
				'blocks'     => GBM_Blocks::gbm_get_all_disabled_blocks(),
				'categories' => GBM_Categories::gbm_get_all_block_categories(),
				'patterns'   => GBM_Patterns::gbm_get_all_disabled_patterns(),
			]
		);
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
