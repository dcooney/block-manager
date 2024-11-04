=== Block Manager ===
Contributors: dcooney, connekthq
Tags: remove blocks, disable blocks, disable patterns, remove patterns, block category
Homepage: https://connekthq.com/
Donate link: https://connekthq.com/donate
Requires at least: 5.0
Requires PHP: 7.0
Tested up to: 6.7
License: GPLv2 or later
Stable tag: 3.1.0

Remove unwanted blocks and block patterns from the Block Inserter and Editor.

== Description ==

The Block Manager is an intuitive tool for site admins to globally remove blocks and block patterns. It also provides functionality for updating the category of individual blocks to help organize the admin editing experience.

### Features

-  **Blocks**:  Globally disable blocks from being displayed in the Block Inserter and Block Editor.
-  **Patterns**: Remove unwanted block patterns with the click of a button.
-  **Block Categories**: Organize the Block Inserter by updating the category of each block.
-  **Hooks**:  Use hooks to remove blocks and patterns from `functions.php`.
-  **Search and Filter**:  Quickly locate blocks and patterns with the search functionality in the sidebar.
-  **Embed Blocks**:  Choose the Embed blocks you actually want to include on your site by removing the vast majority of useless options.

### Hooks & Filters

Use Block Manager hooks to controls blocks via code and sync options across multiple WordPress environments.

#### gbm_disabled_blocks

Use the `gbm_disabled_blocks` hook to remove blocks via backend code.

	// functions.php
	add_filter( 'gbm_disabled_blocks', function() {
		return [
			'core/buttons',
			'core/columns',
			'core/freeform',
			'core/table'
		];
	});

#### gbm_disabled_patterns

Use the `gbm_disabled_patterns` hook to remove block patterns via backend code.

	// functions.php
	add_filter( 'gbm_disabled_patterns', function() {
       return ['gbm/core-patterns', 'core/query-standard-posts', 'core/query-medium-posts'];
	});

#### gbm_block_categories

Use the `gbm_block_categories` hook to update block categories via backend code.

	// functions.php
	add_filter( 'gbm_block_categories', function() {
		return [
			[ 'block' => 'core/html', 'cat' => 'design' ],
			[ 'block' => 'core/cover', 'cat' => 'design' ],
			[ 'block' => 'core/details', 'cat' => 'design' ]
		];
	});

#### block_manager_user_role

Update the minimum user role allowed to access the Block Manager plugin.

	// functions.php
	add_filter(
		'block_manager_user_role',
		'edit_theme_options' // Default: activate_plugins
	);

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
4. Disable Block Patterns: Remove unwanted block patterns and core patterns by toggling the active state of each pattern.
4. Status Reports: Total active and disabled blocks are displayed in the plugin sidebar.
5. Embed Blocks: Choose the Embed blocks you want to allow on your site and remove the majority of useless options.

== Changelog ==

= 3.0.1 - November 3, 2024 =
* UPDATE: New admin UI.
* UPDATE: Various changes for upcoming Block Manager Pro plugin.


= 3.0.0 - April 3, 2024 =
* NEW: Added support for disabling block patterns and core block patterns.
* FIX: Fixed incorrect number of filtered blocks display in Blocks sidebar.
* FIX: Fixed issue with return value in admin_footer text.
* UPDATE: Updated plugin installer vendor file.
* UPDATE: Various code refactoring and organization.
* UPDATE: Various security updates.


= 2.1.1 - November 1, 2023 =
* HOTFIX: Fix for undefined React key warning when `WP_DEBUG` is enabled.


= 2.1.0 - November 1, 2023 =
* NEW: Adding notification system for feedback after an action is performed.
* UPDATE: Added display indicators for variation blocks.
* FIX: Fixed potential upgrade issue with disabled blocks throwing admin error due to object vs array data.
* FIX: Fixed issue with missing loading animation.
* FIX: Fixed issue with block variations not counting towards block count.


= 2.0.0 - October 20, 2023 =
* NEW - New admin interface and interactions for the Block and Block Categories pages.
* NEW: Added block category export and hook `gbm_block_categories` to allow for changing block categories at the theme level.
* UPDATE: Updated build scripts and dependencies to use wp-scripts.
* UPDATE: Block Manager is now supported on Widget screen.
* FIX: Fixed issue with some missing block definitions.
* FIX: Fixed issues with block icons not rendering for some blocks.
* FIX: Fixed issue with various blocks crashing the Block Manager edit screen.
* FIX: Other various bug fixes and overall improvements.


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
