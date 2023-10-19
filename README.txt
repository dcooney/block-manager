=== Block Manager ===
Contributors: dcooney, connekthq
Tags: blocks, remove blocks, disable blocks, manage blocks, block category, update category, block manager
Requires at least: 5.0
Tested up to: 6.3
License: GPLv2 or later
Stable tag: trunk
Homepage: https://connekthq.com/
Version: 2.0.0

Block Manager by [Connekt](https://connekthq.com) will allow you to manage the activation status of WordPress blocks and remove unwanted blocks from the WordPress post editor.

== Description ==

The Block Manager is an intuitive tool for site admins to globally remove unwanted blocks and update the assigned category of individual blocks to organize the admin editing expereince.

### Features

-  **Disable Blocks** - Unlike the block manager functionality in the WordPress Block Editor, this plugin will globally disable (remove) blocks for all users on your site.
-  **Block Categories** - The Category Switcher provides functionality for updating the category assigned to each WordPress blocks.
-  **Search and Filter** - Quickly locate blocks using the block search functionality in the sidebar.
-  **Hooks** - Use the various hooks and filters to update your blocks from `functions.php`.

### Hooks & Filters

Use Block Manager hooks to controls blocks via code and sync options across multiple WordPress environments.

#### gbm_disabled_blocks

Use the `gbm_disabled_blocks` filter to control blocks via backend code.

	// functions.php
	add_filter('gbm_disabled_blocks', function(){
		return [
			'core/buttons',
			'core/columns',
			'core/freeform',
			'core/table'
		];
	});

#### gbm_block_categories

Use the `gbm_block_categories` filter to update block categories blocks via backend code.

	// functions.php
	add_filter( 'gbm_block_categories', function() {
		return [
			[ 'block' => 'core/html', 'cat' => 'design' ],
			[ 'block' => 'core/cover', 'cat' => 'design' ],
			[ 'block' => 'core/details', 'cat' => 'design' ]
		];
	});


== Installation ==

How to install Block Manager.

= Using The WordPress Dashboard =

1. Navigate to the 'Add New' in the plugins dashboard
2. Search for 'Block Manager'
3. Click 'Install Now'
4. Activate the plugin on the Plugin dashboard

= Uploading in WordPress Dashboard =

1. Navigate to the 'Add New' in the plugins dashboard
2. Navigate to the 'Upload' area
3. Select `block-manager.zip` from your computer
4. Click 'Install Now'
5. Activate the plugin in the Plugin dashboard

= Using FTP =

1. Download `block-manager.zip`
2. Extract the `block-manager` directory to your computer
3. Upload the `block-manager` directory to the `/wp-content/plugins/` directory
4. Activate the plugin in the Plugin dashboard

Then navigate to `wp-admin -> Settings -> Block Manager` to use the plugin.

== Screenshots ==

1. Disable Blocks: Easily remove unwanted WordPress blocks by toggling the active state of each block.
2. Block Toggle: Disable all blocks in a block categories with a single click.
3. Block Categories: Improve the admin editing experience by updating the category of each block using the Category Switcher.
4. Status Reports: Total active and disabled blocks are displayed in the plugin sidebar.

== Changelog ==

== 2.0.0 - October 20, 2023 ==
* NEW - New admin interface and interactions for the Block and Block Categories pages.
* NEW: Added block category export and hook `gbm_block_categories` to allow for changing block categories at the theme level.
* FIX: Fixed issue with various blocks crashing the Block Manager edit screen.
* FIX: Various bug fixes and improvements.
* UPDATE: Updated build scripts and dependencies.


= 1.2.5 - May 23, 2023 =
* FIX - Fixed potential issue with JS errors on Site Editor screens.
* UPDATE - WP version bump and testing.


= 1.2.4 - November 30, 2022 =
* HOTFIX - Fixed issue with plugin not working on `edit` screens.


= 1.2.3 - November 19, 2022 =
* FIX: Added fix for blank screen when users have JetPack plugin enabled.
* FIX: Fixed issue with missing semi-colon in Block Manager export functionality.
* FIX: Added fix for only loading the block removal script on `New` and `Edit` screens.


= 1.2.2 - August 17, 2021 =
* NEW - Added new Reset option that will clear all disabled blocks.
* FIX - Added fix for possible issue with icon width on blocks admin page.
* UPDATE - Updated tab navigation inside the plugin to make it more clear which section was being edited.


= 1.2.1 - February 28, 2021 =
* UPDATE - Added Category Switcher support for all block including core Gutenberg blocks.


= 1.2 - February 27, 2021 =
* NEW - Added new Category Switcher.
	* The Category Switcher provides functionality for changing the category core Gutenberg blocks.
	* Changing a block category will update the location of the block in the Gutenberg Block Inserter while editing posts.
* FIX - Fixed issue with missing semi-colon in export code.
* UPDATE - Various admin UI/UX updates.


= 1.1 - January 19, 2021 =

* NEW - Added new `gbm_disabled_blocks` filter to allow for disabling blocks via functions.php
* NEW - Added `Export` option to dynamically build a pre-populated `gbm_disabled_blocks` filter.
* NEW - Added Grid/List view toggle.


= 1.0.1 - January 2, 2021 =

-  NEW - Added support for Embed blocks (Twitter, Facebook, Spotify etc). These blocks were changed in WP 5.6 and the handler had to be updated to manage the active/inactive states.
-  FIX - Fixed REST API warning for missing `permissions_callback`.

= 1.0 - January 6, 2020 =

-  Initial release
