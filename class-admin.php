<?php
/**
 * Block Manager admin class.
 *
 * @author ConnektMedia
 * @since 1.0
 */
class GBM_Admin {

	/**
	 * Construct method.
	 *
	 * @author ConnektMedia
	 * @since 1.0
	 */
	public function __construct() {

		// Register the submenu.
		add_action( 'admin_menu', array( $this, 'gbm_register_sub_menu' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'gbm_admin_enqueue' ) );

	}

	/**
	 * Enqueue the scripts and styles.
	 *
	 * @author ConnektMedia
	 * @since 1.0
	 * @param string $hook The current page ID.
	 * @return null
	 */
	public function gbm_admin_enqueue( $hook ) {

		if ( 'settings_page_block-manager' !== $hook ) {
			return;
		}

		// Register Block Categories.
		$block_categories = array();
		if ( function_exists( 'get_block_categories' ) ) {
			$block_categories = get_block_categories( get_post() );
		}
		wp_add_inline_script( 'wp-blocks', sprintf( 'wp.blocks.setCategories( %s );', wp_json_encode( $block_categories ) ), 'after' );

		do_action( 'enqueue_block_editor_assets' );
		wp_dequeue_script( 'block-manager' );

		$block_registry = WP_Block_Type_Registry::get_instance();
		foreach ( $block_registry->get_all_registered() as $block_name => $block_type ) {
			// Front-end script.
			if ( ! empty( $block_type->editor_script ) ) {
				wp_enqueue_script( $block_type->editor_script );
			}
		}

		// Enqueue Scripts.
		$suffix = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min'; // Use minified libraries if SCRIPT_DEBUG is turned off.

		wp_enqueue_style(
			'block-manager-styles',
			plugins_url(
				'dist/css/style.css',
				__FILE__
			),
			array(),
			BLOCK_MANAGER_VERSION
		);

		wp_enqueue_script(
			'block-manager-admin',
			plugins_url( 'dist/js/gbm-admin' . $suffix . '.js', __FILE__ ),
			array( 'wp-blocks', 'wp-element', 'wp-data', 'wp-edit-post', 'wp-components', 'wp-block-library' ),
			BLOCK_MANAGER_VERSION,
			true
		);

		// Localize Scripts.
		wp_localize_script(
			'block-manager-admin',
			'gbm_localize',
			array(
				'disabledBlocks'     => Gutenberg_Block_Manager::gbm_get_disabled_blocks(),
				'filteredBlocks'     => Gutenberg_Block_Manager::gbm_get_filtered_blocks(),
				'filteredCategories' => Gutenberg_Block_Manager::gbm_get_filtered_cats(),
				'root'               => esc_url_raw( rest_url() ),
				'nonce'              => wp_create_nonce( 'wp_rest' ),
				'enable'             => __( 'Enable', 'block-manager' ),
				'disable'            => __( 'Disable', 'block-manager' ),
				'enable_all'         => __( 'Enable All', 'block-manager' ),
				'disable_all'        => __( 'Disable All', 'block-manager' ),
				'toggle_all'         => __( 'Toggle All Blocks', 'block-manager' ),
				'toggle'             => __( 'Toggle Block Activation', 'block-manager' ),
				'search_label'       => __( 'Filter Blocks', 'block-manager' ),
				'submit'             => __( 'Submit', 'block-manager' ),
				'loading'            => __( 'Loading Blocks', 'block-manager' ),
				'loading_export'     => __( 'Getting export data...', 'block-manager' ),
				'copy'               => __( 'Copy Code', 'block-manager' ),
				'copied'             => __( 'Copied', 'block-manager' ),
				'close'              => __( 'Close', 'block-manager' ),
				'grid'               => __( 'Grid', 'block-manager' ),
				'list'               => __( 'List', 'block-manager' ),
				'cat_switch'         => __( 'Block Category', 'block-manager' ),
				'updated'            => __( 'Category Updated', 'block-manager' ),
				'block_switch'       => __( 'Block Name', 'block-manager' ),
				'reset_blocks'       => __( 'Reset', 'block-manager' ),
				'reset_blocks_title' => __( 'Clear all disabled blocks.', 'block-manager' ),
				'reset_cats'         => __( 'Reset Categories', 'block-manager' ),
				'cat_intro'          => __( 'The Category Switcher provides functionality for changing the categories of Gutenberg blocks.', 'block-manager' ),
				'cat_intro2'         => __( 'Changing a block category will update it\'s location in the Gutenberg Block Inserter while editing posts.', 'block-manager' ),
				'export'             => __( 'Export', 'block-manager' ),
				'export_title'       => __( 'Export a list of disabled blocks via WordPress filter. ', 'block-manager' ),
				'export_intro'       => __( 'Add the the following code to your functions.php to remove blocks at the theme level.', 'block-manager' ),
				'filtered_alert'     => __( 'This block has been globally disabled via the `gbm_disabled_blocks` filter and cannot be activated.', 'block-manager' ),
			)
		);

	}

	/**
	 * Register submenu item.
	 *
	 * @author ConnektMedia
	 * @since 1.0
	 */
	public function gbm_register_sub_menu() {
		add_submenu_page(
			'options-general.php',
			esc_html__( 'Block Manager', 'block-manager' ),
			esc_html__( 'Block Manager', 'block-manager' ),
			apply_filters( 'block_manager_user_role', 'activate_plugins' ),
			'block-manager',
			array( $this, 'gbm_submenu_page_callback' )
		);
	}

	/**
	 * The Block Manager admin page.
	 *
	 * @author ConnektMedia
	 * @since 1.0
	 */
	public function gbm_submenu_page_callback() {
		$active = 'blocks';
		if ( isset( $_GET ) && isset( $_GET['category-switcher'] ) && empty( $_GET['category-switcher'] ) ) {
			$active = 'categories';
		}
		?>

		<div class="gbm-page-wrap">
			<div class="gbm-page-wrap--header">
				<h2><?php esc_html_e( 'Gutenberg Block Manager', 'block-manager' ); ?> <span><a href="https://connekthq.com" target="_blank"><?php esc_html_e( 'by Connekt', 'block-manager' ); ?></a></span></h2>
				<?php if ( 'blocks' === $active ) { ?>
				<p><?php printf( esc_html__( 'Manage the status of your %s Gutenberg blocks - disabled blocks will be globally removed from the block inserter.', 'block-manager' ), '<span class="cnkt-block-totals block-total">--</span>' ); ?>
				<?php } ?>
				<?php if ( 'categories' === $active ) { ?>
				<p><?php printf( esc_html__( 'Update the categories of your %s blocks with the category switcher.', 'block-manager' ), '<span class="cnkt-block-totals block-total">--</span>' ); ?>
				<?php } ?>
				<button class="button" id="otherPlugins"><span class="dashicons dashicons-admin-plugins"></span> <?php esc_html_e( 'Other Plugins', 'block-manager' ); ?></button>
			</div>
			<div id="gbm-container">
				<div id="gbm-other-plugins">
					<?php
					$plugin_array = array(
						array(
							'slug' => 'ajax-load-more',
						),
						array(
							'slug' => 'easy-query',
						),
						array(
							'slug' => 'instant-images',
						),
						array(
							'slug' => 'velocity',
						),
					);
					?>
					<section>
						<h2><?php echo sprintf( __( 'Other Plugins from %1$s Connekt %2$s', 'block-manager' ), '<a href="https://connekthq.com" target="_blank">', '</a>' ); ?></h2>
						<button class="button button-secondary" id="otherPluginsClose">&times; <?php esc_html_e( 'Close', 'block-manager' ); ?></button>
						<div class="cta-wrap">
							<?php
							if ( class_exists( 'Connekt_Plugin_Installer' ) ) {
								Connekt_Plugin_Installer::init( $plugin_array );
							}
							?>
						</div>
					</section>
				</div>
				<div class="nav-tab-wrapper">
					<a class="nav-tab
					<?php
					if ( 'blocks' === $active ) {
						echo ' nav-tab-active'; }
					?>
					" href="options-general.php?page=block-manager">
						<?php esc_html_e( 'Blocks', 'block-manager' ); ?>
					</a>
					<a class="nav-tab
					<?php
					if ( 'categories' === $active ) {
						echo ' nav-tab-active'; }
					?>
					" href="options-general.php?page=block-manager&category-switcher">
						<?php esc_html_e( 'Categories', 'block-manager' ); ?>
					</a>
				</div>
				<div id="app" class="gbm"></div>
			</div>
		</div>
		<?php
	}
}

new GBM_Admin();
