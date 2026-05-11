<?php
/**
 * Plugin Name: BRF Malmohus 17 CMS
 * Description: Strukturerade CMS-falt for BRF Malmohus 17: kontaktuppgifter, styrelse och expeditionstider.
 * Version: 0.1.0
 * Author: BRF Malmohus 17
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('init', 'brf_cms_register_post_types');
add_action('init', 'brf_cms_register_meta');
add_action('add_meta_boxes', 'brf_cms_add_meta_boxes');
add_action('save_post_brf_board_member', 'brf_cms_save_board_member');
add_action('save_post_brf_office_date', 'brf_cms_save_office_date');
add_action('admin_menu', 'brf_cms_admin_menu');
add_action('rest_api_init', 'brf_cms_register_rest_routes');

function brf_cms_register_post_types() {
    register_post_type('brf_board_member', array(
        'labels' => array(
            'name' => 'Styrelse',
            'singular_name' => 'Styrelsemedlem',
            'add_new_item' => 'Lägg till styrelsemedlem',
            'edit_item' => 'Redigera styrelsemedlem',
        ),
        'public' => true,
        'publicly_queryable' => false,
        'exclude_from_search' => true,
        'show_in_nav_menus' => false,
        'has_archive' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'show_in_rest' => true,
        'rest_base' => 'brf-board-members',
        'menu_icon' => 'dashicons-groups',
        'supports' => array('title', 'thumbnail', 'page-attributes'),
    ));

    register_post_type('brf_office_date', array(
        'labels' => array(
            'name' => 'Expeditionstider',
            'singular_name' => 'Expeditionstid',
            'add_new_item' => 'Lägg till expeditionstid',
            'edit_item' => 'Redigera expeditionstid',
        ),
        'public' => true,
        'publicly_queryable' => false,
        'exclude_from_search' => true,
        'show_in_nav_menus' => false,
        'has_archive' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'show_in_rest' => true,
        'rest_base' => 'brf-office-dates',
        'menu_icon' => 'dashicons-calendar-alt',
        'supports' => array('title', 'page-attributes'),
    ));
}

function brf_cms_register_meta() {
    register_post_meta('brf_board_member', 'brf_role', array(
        'type' => 'string',
        'single' => true,
        'show_in_rest' => true,
        'auth_callback' => '__return_true',
    ));

    register_post_meta('brf_board_member', 'brf_phone', array(
        'type' => 'string',
        'single' => true,
        'show_in_rest' => true,
        'auth_callback' => '__return_true',
    ));

    register_post_meta('brf_office_date', 'brf_date', array(
        'type' => 'string',
        'single' => true,
        'show_in_rest' => true,
        'auth_callback' => '__return_true',
    ));

    register_post_meta('brf_office_date', 'brf_label', array(
        'type' => 'string',
        'single' => true,
        'show_in_rest' => true,
        'auth_callback' => '__return_true',
    ));
}

function brf_cms_add_meta_boxes() {
    add_meta_box('brf_board_member_details', 'Styrelseuppgifter', 'brf_cms_board_member_meta_box', 'brf_board_member', 'normal', 'high');
    add_meta_box('brf_office_date_details', 'Expeditionstid', 'brf_cms_office_date_meta_box', 'brf_office_date', 'normal', 'high');
}

function brf_cms_board_member_meta_box($post) {
    wp_nonce_field('brf_cms_save_board_member', 'brf_cms_board_member_nonce');
    $role = get_post_meta($post->ID, 'brf_role', true);
    $phone = get_post_meta($post->ID, 'brf_phone', true);
    ?>
    <p>
        <label for="brf_role"><strong>Roll</strong></label><br>
        <input type="text" id="brf_role" name="brf_role" value="<?php echo esc_attr($role); ?>" class="widefat" placeholder="Exempel: Ordförande">
    </p>
    <p>
        <label for="brf_phone"><strong>Telefon</strong></label><br>
        <input type="text" id="brf_phone" name="brf_phone" value="<?php echo esc_attr($phone); ?>" class="widefat" placeholder="Exempel: 0723-190192">
    </p>
    <p class="description">Namnet skrivs i rubrikfältet. Bild läggs som utvald bild. Sortering kan styras med sidordning.</p>
    <?php
}

function brf_cms_office_date_meta_box($post) {
    wp_nonce_field('brf_cms_save_office_date', 'brf_cms_office_date_nonce');
    $date = get_post_meta($post->ID, 'brf_date', true);
    $label = get_post_meta($post->ID, 'brf_label', true);
    ?>
    <p>
        <label for="brf_date"><strong>Datum</strong></label><br>
        <input type="date" id="brf_date" name="brf_date" value="<?php echo esc_attr($date); ?>" class="widefat">
    </p>
    <p>
        <label for="brf_label"><strong>Visningstext</strong></label><br>
        <input type="text" id="brf_label" name="brf_label" value="<?php echo esc_attr($label); ?>" class="widefat" placeholder="Exempel: 11 maj">
    </p>
    <p class="description">Rubriken kan vara samma som visningstexten. Sortering kan styras med sidordning.</p>
    <?php
}

function brf_cms_save_board_member($post_id) {
    if (!isset($_POST['brf_cms_board_member_nonce']) || !wp_verify_nonce($_POST['brf_cms_board_member_nonce'], 'brf_cms_save_board_member')) {
        return;
    }

    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    update_post_meta($post_id, 'brf_role', sanitize_text_field($_POST['brf_role'] ?? ''));
    update_post_meta($post_id, 'brf_phone', sanitize_text_field($_POST['brf_phone'] ?? ''));
}

function brf_cms_save_office_date($post_id) {
    if (!isset($_POST['brf_cms_office_date_nonce']) || !wp_verify_nonce($_POST['brf_cms_office_date_nonce'], 'brf_cms_save_office_date')) {
        return;
    }

    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    update_post_meta($post_id, 'brf_date', sanitize_text_field($_POST['brf_date'] ?? ''));
    update_post_meta($post_id, 'brf_label', sanitize_text_field($_POST['brf_label'] ?? ''));
}

function brf_cms_admin_menu() {
    add_options_page('BRF kontaktuppgifter', 'BRF kontaktuppgifter', 'manage_options', 'brf-cms-contact', 'brf_cms_contact_settings_page');
}

function brf_cms_contact_settings_page() {
    if (!current_user_can('manage_options')) {
        return;
    }

    if (isset($_POST['brf_cms_contact_nonce']) && wp_verify_nonce($_POST['brf_cms_contact_nonce'], 'brf_cms_save_contact')) {
        $fields = brf_cms_contact_fields();

        foreach ($fields as $key => $label) {
            update_option($key, sanitize_text_field($_POST[$key] ?? ''));
        }

        echo '<div class="updated"><p>Kontaktuppgifterna sparades.</p></div>';
    }

    $fields = brf_cms_contact_fields();
    ?>
    <div class="wrap">
        <h1>BRF kontaktuppgifter</h1>
        <form method="post">
            <?php wp_nonce_field('brf_cms_save_contact', 'brf_cms_contact_nonce'); ?>
            <table class="form-table" role="presentation">
                <?php foreach ($fields as $key => $label) : ?>
                    <tr>
                        <th scope="row"><label for="<?php echo esc_attr($key); ?>"><?php echo esc_html($label); ?></label></th>
                        <td><input name="<?php echo esc_attr($key); ?>" id="<?php echo esc_attr($key); ?>" type="text" value="<?php echo esc_attr(get_option($key, '')); ?>" class="regular-text"></td>
                    </tr>
                <?php endforeach; ?>
            </table>
            <?php submit_button('Spara kontaktuppgifter'); ?>
        </form>
    </div>
    <?php
}

function brf_cms_contact_fields() {
    return array(
        'brf_contact_email' => 'Styrelsens e-post',
        'brf_contact_phone' => 'Telefon',
        'brf_expedition_address' => 'Expeditionens adress',
        'brf_telephone_hours' => 'Telefontid',
        'brf_riksbyggen_phone' => 'Riksbyggen telefon',
        'brf_caretaker_phone' => 'Vaktmästare telefon',
        'brf_fault_report_url' => 'Felanmälan-länk',
        'brf_broker_email' => 'Mäklare e-post',
    );
}

function brf_cms_register_rest_routes() {
    register_rest_route('brf/v1', '/contact', array(
        'methods' => 'GET',
        'callback' => 'brf_cms_get_contact_rest',
        'permission_callback' => '__return_true',
    ));
}

function brf_cms_get_contact_rest() {
    $fields = brf_cms_contact_fields();
    $data = array();

    foreach ($fields as $key => $label) {
        $data[$key] = get_option($key, '');
    }

    return rest_ensure_response($data);
}
