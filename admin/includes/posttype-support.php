<?php

function bogo_posttype_support_page()
{
    if (! current_user_can('bogo_manage_language_packs')) {
        wp_die(__("You are not allowed to manage post type support.", 'bogo'));
    }

    $post_types = get_post_types(array(
        'public' => true,
    ), 'objects');

    // Remove built-in post types that are not localizable
    unset($post_types['attachment']);
    unset($post_types['revision']);
    unset($post_types['nav_menu_item']);

    // Get saved supported post types or set defaults
    $supported_post_types = bogo_get_prop('supported_post_types');
    if (empty($supported_post_types)) {
        $supported_post_types = array( 'post', 'page' );
        bogo_set_prop('supported_post_types', $supported_post_types);
    }

    if (isset($_POST['bogo-save-posttype-support'])) {
        check_admin_referer('bogo-save-posttype-support');

        $new_supported_post_types = array();

        if (isset($_POST['bogo_supported_post_types']) && is_array($_POST['bogo_supported_post_types'])) {
            foreach ($_POST['bogo_supported_post_types'] as $post_type) {
                if (isset($post_types[$post_type])) {
                    $new_supported_post_types[] = $post_type;
                }
            }
        }

        bogo_set_prop('supported_post_types', $new_supported_post_types);

        echo '<div class="updated notice notice-success is-dismissible"><p>'
            . esc_html__('Post type support settings saved.', 'bogo')
            . '</p></div>';

        $supported_post_types = $new_supported_post_types;
    }

    ?>
    <div class="wrap">
        <h1><?php echo esc_html__('Post Type Support', 'bogo'); ?></h1>
        
        <p><?php echo esc_html__('Select which post types should be translatable using Bogo.', 'bogo'); ?></p>
        
        <form method="post" action="">
            <?php wp_nonce_field('bogo-save-posttype-support'); ?>
            
            <table class="form-table">
                <tbody>
                    <?php foreach ($post_types as $post_type) : ?>
                    <tr>
                        <th scope="row">
                            <label for="bogo-posttype-<?php echo esc_attr($post_type->name); ?>">
                                <?php echo esc_html($post_type->labels->name); ?>
                            </label>
                        </th>
                        <td>
                            <input type="checkbox" 
                                name="bogo_supported_post_types[]" 
                                id="bogo-posttype-<?php echo esc_attr($post_type->name); ?>"
                                value="<?php echo esc_attr($post_type->name); ?>"
                                <?php checked(in_array($post_type->name, $supported_post_types)); ?>
                            />
                            <span class="description">
                                <?php echo esc_html(sprintf(
                                    /* translators: %s: post type name */
                                    __('Enable translation support for %s', 'bogo'),
                                    $post_type->labels->name
                                )); ?>
                            </span>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
            
            <p class="submit">
                <input type="submit" class="button-primary" name="bogo-save-posttype-support" value="<?php echo esc_attr__('Save Changes', 'bogo'); ?>" />
            </p>
        </form>
    </div>
    <?php
}
