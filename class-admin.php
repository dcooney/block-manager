<?php
/**
 * This file contains admin functions.
 *
 * @package blockmanager.
 */

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
		add_action( 'admin_menu', [ $this, 'gbm_register_sub_menu' ] );
		add_action( 'admin_enqueue_scripts', [ $this, 'gbm_admin_enqueue' ] );
	}

	/**
	 * Enqueue the scripts and styles.
	 *
	 * @author ConnektMedia
	 * @since 1.0
	 * @param string $page The current page ID.
	 * @return null
	 */
	public function gbm_admin_enqueue( $page ) {
		if ( $page !== 'settings_page_block-manager' ) {
			return;
		}

		// Register Block Categories.
		$block_categories = [];
		if ( function_exists( 'get_block_categories' ) ) {
			$block_categories = get_block_categories( get_post() );
		}
		wp_add_inline_script( 'wp-blocks', sprintf( 'wp.blocks.setCategories( %s );', wp_json_encode( $block_categories ) ), 'after' );

		do_action( 'enqueue_block_editor_assets' );
		wp_dequeue_script( 'block-manager' );

		// -> https://github.com/WordPress/gutenberg/issues/22812
		wp_add_inline_script( 'wp-blocks', 'wp.blocks.unstable__bootstrapServerSideBlockDefinitions(' . wp_json_encode( get_block_editor_server_block_settings() ) . ');' );

		$block_registry = WP_Block_Type_Registry::get_instance();
		foreach ( $block_registry->get_all_registered() as $block_name => $block_type ) {
			// Front-end script.
			if ( ! empty( $block_type->editor_script ) ) {
				wp_enqueue_script( $block_type->editor_script );
			}
		}

		// Enqueue Scripts.
		wp_enqueue_style(
			'block-manager-styles',
			plugins_url(
				'build/style-block-manager-admin.css',
				__FILE__
			),
			[],
			BLOCK_MANAGER_VERSION
		);

		wp_enqueue_script(
			'block-manager-admin',
			plugins_url( 'build/block-manager-admin.js', __FILE__ ),
			[ 'wp-blocks', 'wp-element', 'wp-data', 'wp-components', 'wp-block-library' ],
			BLOCK_MANAGER_VERSION,
			true
		);

		$filtered_blocks     = Gutenberg_Block_Manager::gbm_get_filtered_blocks();
		$filtered_categories = Gutenberg_Block_Manager::gbm_get_filtered_categories();

		// Localize Scripts.
		wp_localize_script(
			'block-manager-admin',
			'gbm_localize',
			[
				'root'                  => esc_url_raw( rest_url() ),
				'nonce'                 => wp_create_nonce( 'wp_rest' ),
				'disabledBlocks'        => $this->gbm_remove_duplicate_blocks( Gutenberg_Block_Manager::gbm_get_disabled_blocks(), $filtered_blocks ),
				'filteredBlocks'        => $filtered_blocks,
				'disabledBlocksAll'     => Gutenberg_Block_Manager::gbm_get_all_disabled_blocks(),
				'blockCategories'       => $this->gbm_remove_duplicate_categories( Gutenberg_Block_Manager::gbm_get_block_categories(), $filtered_categories ),
				'filteredCategories'    => $filtered_categories,
				'filteredCategoriesAll' => Gutenberg_Block_Manager::gbm_get_all_block_categories(),
			]
		);
	}

	/**
	 * Remove any duplicate block categories when using category hook.
	 *
	 * @param array $options  The categories from WP options.
	 * @param array $filtered The filtered categories.
	 * @return array          Modified options.
	 */
	public function gbm_remove_duplicate_blocks( $options, $filtered ) {
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

	/**
	 * Remove any duplicate block categories when using category hook.
	 *
	 * @param array $options  The categories from WP options.
	 * @param array $filtered The filtered categories.
	 * @return array          Modified options.
	 */
	public function gbm_remove_duplicate_categories( $options, $filtered ) {
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
			[
				$this,
				'gbm_submenu_page_callback',
			]
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
		<h1 class="gbm-h1"><?php esc_html_e( 'Block Manager', 'block-manager' ); ?></h1>
		<div class="gbm-page-wrap">
			<div class="gbm-page-wrap--header">
				<div class="gbm-page-wrap--header-title">
					<h2><?php esc_html_e( 'Block Manager', 'block-manager' ); ?> <span><?php echo esc_attr( BLOCK_MANAGER_VERSION ); ?></span></h2>
					<p><?php esc_html_e( 'Take control of your WordPress blocks.', 'block-manager' ); ?></p>
				</div>
				<button class="gbm-other-button" id="otherPlugins">
					<span class="dashicons dashicons-admin-plugins"></span> <?php esc_html_e( 'Other Plugins', 'block-manager' ); ?>
				</button>
			</div>
			<div id="gbm-container">
				<div id="gbm-other-plugins">
					<?php
					$plugin_array = [
						[
							'slug' => 'ajax-load-more',
						],
						[
							'slug' => 'easy-query',
						],
						[
							'slug' => 'instant-images',
						],
					];
					?>
					<section>
						<div>
							<h2>
							<?php
							/* translators: %1$s & %2$s is replaced with the link content */
							echo sprintf( __( 'Other WordPress Plugins from %1$s Connekt %2$s', 'block-manager' ), '<a href="https://connekthq.com" target="_blank">', '</a>' ); // @codingStandardsIgnoreLine
							?>
							</h2>
						</div>
						<div class="cta-wrap">
							<?php
							if ( class_exists( 'Connekt_Plugin_Installer' ) ) {
								Connekt_Plugin_Installer::init( $plugin_array );
							}
							?>
						</div>
						<div class="gbm-close-wrap">
							<button class="gbm-other-button--close" id="otherPluginsClose"><?php esc_html_e( 'Close', 'block-manager' ); ?></button>
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
						<?php esc_html_e( 'Block Categories', 'block-manager' ); ?>
					</a>
				</div>
				<div id="app" class="gbm"></div>
			</div>
		</div>
		<?php
	}
}

new GBM_Admin();
