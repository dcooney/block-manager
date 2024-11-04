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
		add_filter( 'plugin_action_links_' . BLOCK_MANAGER_BASENAME, [ &$this, 'gbm_action_links' ] );
		add_filter( 'admin_footer_text', [ &$this, 'gbm_filter_admin_footer_text' ] );
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
			BLOCK_MANAGER_URL . '/build/style-block-manager-admin.css',
			[],
			BLOCK_MANAGER_VERSION
		);

		wp_enqueue_script(
			'block-manager-admin',
			BLOCK_MANAGER_URL . '/build/block-manager-admin.js',
			[ 'wp-blocks', 'wp-element', 'wp-data', 'wp-components', 'wp-block-library' ],
			BLOCK_MANAGER_VERSION,
			true
		);

		$filtered_blocks     = GBM_Blocks::gbm_get_filtered_blocks();
		$filtered_categories = GBM_Categories::gbm_get_filtered_categories();
		$filtered_patterns   = GBM_Patterns::gbm_get_filtered_patterns();

		// Localize Scripts.
		wp_localize_script(
			'block-manager-admin',
			'gbm_localize',
			[
				'root'                  => esc_url_raw( rest_url() ),
				'nonce'                 => wp_create_nonce( 'wp_rest' ),
				'disabledBlocks'        => GBM_Blocks::gbm_remove_duplicate_blocks( GBM_Blocks::gbm_get_disabled_blocks(), $filtered_blocks ),
				'filteredBlocks'        => $filtered_blocks,
				'disabledBlocksAll'     => GBM_Blocks::gbm_get_all_disabled_blocks(),
				'blockCategories'       => GBM_Categories::gbm_remove_duplicate_categories( GBM_Categories::gbm_get_block_categories(), $filtered_categories ),
				'filteredCategories'    => $filtered_categories,
				'filteredCategoriesAll' => GBM_Categories::gbm_get_all_block_categories(),
				'patterns'              => GBM_Patterns::gbm_get_all_patterns(),
				'disabledPatterns'      => GBM_Blocks::gbm_remove_duplicate_blocks( GBM_Patterns::gbm_get_disabled_patterns(), $filtered_patterns ),
				'filteredPatterns'      => $filtered_patterns,
				'disabledPatternsAll'   => GBM_Blocks::gbm_get_all_disabled_blocks(),

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
		if ( isset( $_GET ) && isset( $_GET['categories'] ) && empty( $_GET['categories'] ) ) {
			$active = 'categories';
		}
		if ( isset( $_GET ) && isset( $_GET['patterns'] ) && empty( $_GET['patterns'] ) ) {
			$active = 'patterns';
		}
		?>
		<h1 class="gbm-h1"><?php esc_html_e( 'Block Manager', 'block-manager' ); ?></h1>
		<div class="gbm-page-wrap">
			<header class="gbm-page-wrap--header">
				<div class="gbm-container">
					<div class="gbm-page-wrap--header-title">
						<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M42.8264 19.2566H45.3709C46.8149 19.2566 48.001 20.4176 48 21.8585V26.1655C48 27.6105 46.8128 28.7455 45.3688 28.7455H42.8233C42.3503 30.5873 41.6121 32.3258 40.6515 33.9066L42.4787 35.7546C42.9715 36.2495 43.2451 36.9063 43.2451 37.6058C43.243 38.3044 42.9726 38.9632 42.4787 39.456L39.4299 42.5017C38.936 42.9945 38.2772 43.267 37.5777 43.267C36.8771 43.267 36.2193 42.9956 35.7244 42.4996L33.8272 40.6077C32.2631 41.5192 30.5884 42.2208 28.7434 42.6719V45.3918C28.7434 46.8358 27.5897 48 26.1457 48H21.8356C20.3915 48 19.2555 46.8358 19.2555 45.3918V42.6729C17.4116 42.2208 15.7264 41.5192 14.1624 40.6077L12.2485 42.5038C11.7536 42.9966 11.0958 43.2691 10.3973 43.2691C9.69877 43.2691 9.04203 42.9977 8.54712 42.5038L5.4983 39.456C5.00444 38.9622 4.73192 38.3012 4.73192 37.6017C4.73192 36.9021 5.00339 36.2412 5.4983 35.7473L7.32759 33.9066C6.36701 32.3268 5.62882 30.5894 5.15688 28.7455H2.61133C1.16628 28.7455 0 27.6105 0 26.1655V21.8585C0 20.4176 1.16628 19.2566 2.61133 19.2566H5.15688C5.62882 17.4127 6.36805 15.6857 7.32968 14.106L5.50039 12.2683C5.00548 11.7745 4.73506 11.1167 4.73506 10.4182C4.73506 9.72905 5.01383 9.05455 5.50248 8.56695L8.5492 5.52127C9.54007 4.53354 11.2691 4.5325 12.2569 5.52232L14.1624 7.41738C15.7264 6.50587 17.4116 5.80318 19.2555 5.35317V2.63117C19.2555 1.18716 20.3915 0 21.8356 0H26.1457C27.5897 0 28.7434 1.18716 28.7434 2.63117V5.35422C30.5884 5.80527 32.2631 6.50692 33.8251 7.41738L35.7317 5.52232C36.7163 4.53459 38.4443 4.53354 39.433 5.52336L42.4819 8.56904C42.9736 9.06186 43.2472 9.72174 43.2472 10.4203C43.2472 11.1198 42.9757 11.7786 42.4819 12.2725L40.6526 14.106C41.6152 15.6857 42.3534 17.4127 42.8264 19.2566ZM10.1982 24.1349C10.1982 31.7801 16.397 37.9828 24.0417 37.9828C31.6881 37.9828 37.8887 31.7819 37.8905 24.1349C37.8905 16.4843 31.6881 10.2905 24.0417 10.2905C16.397 10.2905 10.1982 16.4843 10.1982 24.1349Z" fill="white" fill-opacity="0.75"/>
							<path fill-rule="evenodd" clip-rule="evenodd" d="M35 24C35 17.9249 30.0751 13 24 13C17.9249 13 13 17.9249 13 24C13 30.0751 17.9249 35 24 35C30.0751 35 35 30.0751 35 24ZM27.8322 20.4387C28.1021 20.2216 28.498 20.2383 28.7486 20.4889C29.0171 20.7573 29.0171 21.1927 28.7486 21.4611L22.6986 27.5111L22.6428 27.5613C22.3729 27.7784 21.977 27.7617 21.7264 27.5111L19.2514 25.0361L19.2012 24.9803C18.9841 24.7104 19.0008 24.3145 19.2514 24.0639C19.5198 23.7954 19.9552 23.7954 20.2236 24.0639L22.2125 26.0527L27.7764 20.4889L27.8322 20.4387Z" fill="white"/>
						</svg>
						<h2><?php esc_html_e( 'Block Manager', 'block-manager' ); ?></h2>
					</div>
					<nav>
						<a class="gbm-tab<?php echo 'blocks' === $active ?' gbm-tab-active' : ''; ?>" href="options-general.php?page=block-manager">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
								<path fill="currentColor" d="M78.6 5C69.1-2.4 55.6-1.5 47 7L7 47c-8.5 8.5-9.4 22-2.1 31.6l80 104c4.5 5.9 11.6 9.4 19 9.4l54.1 0 109 109c-14.7 29-10 65.4 14.3 89.6l112 112c12.5 12.5 32.8 12.5 45.3 0l64-64c12.5-12.5 12.5-32.8 0-45.3l-112-112c-24.2-24.2-60.6-29-89.6-14.3l-109-109 0-54.1c0-7.5-3.5-14.5-9.4-19L78.6 5zM19.9 396.1C7.2 408.8 0 426.1 0 444.1C0 481.6 30.4 512 67.9 512c18 0 35.3-7.2 48-19.9L233.7 374.3c-7.8-20.9-9-43.6-3.6-65.1l-61.7-61.7L19.9 396.1zM512 144c0-10.5-1.1-20.7-3.2-30.5c-2.4-11.2-16.1-14.1-24.2-6l-63.9 63.9c-3 3-7.1 4.7-11.3 4.7L352 176c-8.8 0-16-7.2-16-16l0-57.4c0-4.2 1.7-8.3 4.7-11.3l63.9-63.9c8.1-8.1 5.2-21.8-6-24.2C388.7 1.1 378.5 0 368 0C288.5 0 224 64.5 224 144l0 .8 85.3 85.3c36-9.1 75.8 .5 104 28.7L429 274.5c49-23 83-72.8 83-130.5zM56 432a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z"/>
							</svg>
							<?php esc_html_e( 'Blocks', 'block-manager' ); ?>
						</a>
						<a class="gbm-tab<?php echo 'categories' === $active ?' gbm-tab-active' : ''; ?>" href="options-general.php?page=block-manager&categories">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
								<path fill="currentColor" d="M345 39.1L472.8 168.4c52.4 53 52.4 138.2 0 191.2L360.8 472.9c-9.3 9.4-24.5 9.5-33.9 .2s-9.5-24.5-.2-33.9L438.6 325.9c33.9-34.3 33.9-89.4 0-123.7L310.9 72.9c-9.3-9.4-9.2-24.6 .2-33.9s24.6-9.2 33.9 .2zM0 229.5L0 80C0 53.5 21.5 32 48 32l149.5 0c17 0 33.3 6.7 45.3 18.7l168 168c25 25 25 65.5 0 90.5L277.3 442.7c-25 25-65.5 25-90.5 0l-168-168C6.7 262.7 0 246.5 0 229.5zM144 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/>
							</svg>
							<?php esc_html_e( 'Categories', 'block-manager' ); ?>
						</a>
						<a class="gbm-tab<?php echo 'patterns' === $active ?' gbm-tab-active' : ''; ?>" href="options-general.php?page=block-manager&patterns">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
								<path fill="currentColor" d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm88 64l0 64-88 0 0-64 88 0zm56 0l88 0 0 64-88 0 0-64zm240 0l0 64-88 0 0-64 88 0zM64 224l88 0 0 64-88 0 0-64zm232 0l0 64-88 0 0-64 88 0zm64 0l88 0 0 64-88 0 0-64zM152 352l0 64-88 0 0-64 88 0zm56 0l88 0 0 64-88 0 0-64zm240 0l0 64-88 0 0-64 88 0z"/>
							</svg>
							<?php esc_html_e( 'Patterns', 'block-manager' ); ?>
						</a>
					</nav>
					<span class="gbm-version" title="Block Manager: <?php echo esc_attr( BLOCK_MANAGER_VERSION ); ?>"><?php echo esc_attr( BLOCK_MANAGER_VERSION ); ?></span>
				</div>
			</header>
			<hr class="wp-header-end">
			<div id="gbm-container">
				<div id="app" class="gbm"></div>
			</div>
		</div>
		<?php
	}

	/**
	 * Add plugin action links to WP plugin screen
	 *
	 * @author ConnektMedia
	 * @since 1.0
	 * @param array $links The action links.
	 * @return array
	 */
	public function gbm_action_links( $links ) {
		$settings = '<a href="' . get_admin_url( null, 'options-general.php?page=block-manager' ) . '">' . __( 'Blocks', 'block-manager' ) . '</a>';
		$cats     = '<a href="' . get_admin_url( null, 'options-general.php?page=block-manager&categories' ) . '">' . __( 'Categories', 'block-manager' ) . '</a>';
		$patterns = '<a href="' . get_admin_url( null, 'options-general.php?page=block-manager&patterns' ) . '">' . __( 'Patterns', 'block-manager' ) . '</a>';
		array_unshift( $links, $settings, $cats, $patterns );
		return $links;
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
			$atts    = ' target="_blank" style="font-weight: 500;"';

			$msg  = 'Block Manager <a href="https://wordpress.org/plugins/block-manager/" target="_blank" style="font-weight: 500;">' . BLOCK_MANAGER_VERSION . '</a> ';
			$msg .= $divider . ' <a href="https://wordpress.org/support/plugin/block-manager/reviews/" ' . $atts . '>Leave Review</a> ';
			$msg .= $divider . ' <a href="https://wordpress.org/support/plugin/block-manager/" ' . $atts . '>Support</a> ';
			$msg .= $divider . ' <a href="https://github.com/dcooney/block-manager/" ' . $atts . '>Github</a>';

			$text = wp_kses_post( $msg );
		}

		return $text;
	}
}

new GBM_Admin();
