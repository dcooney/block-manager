<?php
/*
Plugin Name: Block Manager
Plugin URI: https://connekthq.com/plugins/block-manager/
Description: Control the active status of all your Gutenberg blocks.
Text Domain: block-manager
Author: Darren Cooney
Author URI: https://connekthq.com 
Version: 1.0
License: GPL
Copyright: Darren Cooney & Connekt Media


TO DO
- Logo/Icon [DONE]
- Search
- Export Settings
- Do not allow Paragraph to be disabled
- Anchor links to categories [DONE]
- Expand and collapse sections
- Add related plugins

*/


// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'BLOCK_MANAGER_VERSION', '1.0');
define( 'BLOCK_MANAGER_RELEASE', 'January 3, 2020');
define( 'BLOCK_MANAGER_DIR_PATH', plugin_dir_path( __FILE__ ) );
define( 'BLOCK_MANAGER_OPTION', 'gbm_disabled_blocks');


class Gutenberg_Block_Manager {
	
	private static $instance = null;
	
	public static function instance() {
		if ( null === self::$instance ) {
			self::$instance = new Gutenberg_Block_Manager();
		}
		return self::$instance;
	}
	

	/**
	 * Initialize plugin.
	 */
	private function __construct() {

		add_action( 'enqueue_block_editor_assets', array( $this, 'gbm_enqueue' ) );
		load_plugin_textdomain( 'gutenberg-block-manager', false, dirname(plugin_basename( __FILE__ )).'/lang');
		add_filter( 'plugin_action_links_' . plugin_basename(__FILE__), array(&$this, 'gbm_action_links') );
		require_once(BLOCK_MANAGER_DIR_PATH . 'class-admin.php');	
		require_once('api/toggle.php');
		require_once('api/bulk_process.php');
		include_once('vendor/connekt-plugin-installer/class-connekt-plugin-installer.php');

	}
	

	/**
	 * Enqueue the scripts.
	 */
	public function gbm_enqueue() {
		$script = 'dist/js/gbm.js';
		wp_enqueue_script( 'gutenberg-block-manager', plugins_url( $script, __FILE__ ), array( 'wp-edit-post' ), BLOCK_MANAGER_VERSION, false );
		wp_localize_script( 'gutenberg-block-manager', 'gutenberg_block_manager', $this->gbm_get_disabled_blocks() );

	}
	

	/**
	 * Get all disabled blocks.
	 */
	public function gbm_get_disabled_blocks() {
		return (array) get_option(BLOCK_MANAGER_OPTION, array());
	}



	/**
	 * gbm_action_links
	 * Add plugin action links to WP plugin screen
	 *
	 * @since 1.0
	 */
   public function gbm_action_links( $links ) {
      $settings = '<a href="'. get_admin_url(null, 'options-general.php?page=gutenberg-block-manager') .'">'.__('Manage Blocks', 'gutenberg-block-manager').'</a>';
		array_unshift( $links, $settings );
      return $links;
   }

}

/**
 * The main function for Gutenberg_Block_Manager_Init
 */
function Gutenberg_Block_Manager_Init() {
	include_once ABSPATH . 'wp-admin/includes/plugin.php';
	if ( is_plugin_active('gutenberg/gutenberg.php') || version_compare(get_bloginfo('version'), '4.9.9', '>')){
		Gutenberg_Block_Manager::instance();
	}
}

add_action( 'plugins_loaded', 'Gutenberg_Block_Manager_Init', 100 );
