<?php
/**
 * Plugin Name: BRF Malmohus 17 CMS
 * Description: Strukturerade CMS-falt for BRF Malmohus 17: kontakt, styrelse, ansvar, expeditionstider och sidtexter.
 * Version: 0.2.0
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
add_action('save_post_brf_responsibility', 'brf_cms_save_responsibility_group');
add_action('admin_menu', 'brf_cms_admin_menu');
add_action('rest_api_init', 'brf_cms_register_rest_routes');
add_action('after_setup_theme', 'brf_cms_enable_featured_images');

function brf_cms_enable_featured_images() {
    add_theme_support('post-thumbnails', array('post', 'page', 'brf_board_member'));
}

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

    register_post_type('brf_responsibility', array(
        'labels' => array(
            'name' => 'Ansvar och roller',
            'singular_name' => 'Ansvarsgrupp',
            'add_new_item' => 'Lagg till ansvarsgrupp',
            'edit_item' => 'Redigera ansvarsgrupp',
        ),
        'public' => true,
        'publicly_queryable' => false,
        'exclude_from_search' => true,
        'show_in_nav_menus' => false,
        'has_archive' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'show_in_rest' => true,
        'rest_base' => 'brf-responsibility-groups',
        'menu_icon' => 'dashicons-id',
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

    register_post_meta('brf_responsibility', 'brf_people', array(
        'type' => 'string',
        'single' => true,
        'show_in_rest' => true,
        'auth_callback' => '__return_true',
    ));
}

function brf_cms_add_meta_boxes() {
    add_meta_box('brf_board_member_details', 'Styrelseuppgifter', 'brf_cms_board_member_meta_box', 'brf_board_member', 'normal', 'high');
    add_meta_box('brf_office_date_details', 'Expeditionstid', 'brf_cms_office_date_meta_box', 'brf_office_date', 'normal', 'high');
    add_meta_box('brf_responsibility_details', 'Personer och telefonnummer', 'brf_cms_responsibility_meta_box', 'brf_responsibility', 'normal', 'high');
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

function brf_cms_responsibility_meta_box($post) {
    wp_nonce_field('brf_cms_save_responsibility_group', 'brf_cms_responsibility_nonce');
    $people = get_post_meta($post->ID, 'brf_people', true);
    ?>
    <p>
        <label for="brf_people"><strong>Personer</strong></label><br>
        <textarea id="brf_people" name="brf_people" class="widefat" rows="8" placeholder="Exempel:&#10;Anette Jensen&#10;Marcus Odelstig | 0760-273559"><?php echo esc_textarea($people); ?></textarea>
    </p>
    <p class="description">Skriv en person per rad. Telefonnummer ar valfritt och skrivs efter ett lodstreck: Namn | telefon. Rubriken blir ansvarsgruppens titel.</p>
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

function brf_cms_save_responsibility_group($post_id) {
    if (!isset($_POST['brf_cms_responsibility_nonce']) || !wp_verify_nonce($_POST['brf_cms_responsibility_nonce'], 'brf_cms_save_responsibility_group')) {
        return;
    }

    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    update_post_meta($post_id, 'brf_people', sanitize_textarea_field($_POST['brf_people'] ?? ''));
}

function brf_cms_admin_menu() {
    add_options_page('BRF kontaktuppgifter', 'BRF kontaktuppgifter', 'manage_options', 'brf-cms-contact', 'brf_cms_contact_settings_page');
    add_options_page('BRF kontaktsida', 'BRF kontaktsida', 'manage_options', 'brf-cms-contact-page', 'brf_cms_contact_page_texts_settings_page');
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

function brf_cms_contact_page_texts_settings_page() {
    if (!current_user_can('manage_options')) {
        return;
    }

    if (isset($_POST['brf_cms_contact_page_nonce']) && wp_verify_nonce($_POST['brf_cms_contact_page_nonce'], 'brf_cms_save_contact_page_texts')) {
        $fields = brf_cms_contact_page_text_fields();

        foreach ($fields as $key => $field) {
            update_option($key, sanitize_textarea_field($_POST[$key] ?? ''));
        }

        echo '<div class="updated"><p>Kontaktsidans texter sparades.</p></div>';
    }

    $fields = brf_cms_contact_page_text_fields();
    ?>
    <div class="wrap">
        <h1>BRF kontaktsida</h1>
        <p>Har redigeras de synliga texterna pa kontaktsidan. Lamna ett falt tomt for att anvanda standardtexten fran Vercel-sidan.</p>
        <form method="post">
            <?php wp_nonce_field('brf_cms_save_contact_page_texts', 'brf_cms_contact_page_nonce'); ?>
            <table class="form-table" role="presentation">
                <?php foreach ($fields as $key => $field) : ?>
                    <tr>
                        <th scope="row"><label for="<?php echo esc_attr($key); ?>"><?php echo esc_html($field['label']); ?></label></th>
                        <td>
                            <?php if (($field['type'] ?? 'text') === 'textarea') : ?>
                                <textarea name="<?php echo esc_attr($key); ?>" id="<?php echo esc_attr($key); ?>" class="large-text" rows="<?php echo esc_attr($field['rows'] ?? 3); ?>"><?php echo esc_textarea(get_option($key, '')); ?></textarea>
                            <?php else : ?>
                                <input name="<?php echo esc_attr($key); ?>" id="<?php echo esc_attr($key); ?>" type="text" value="<?php echo esc_attr(get_option($key, '')); ?>" class="regular-text">
                            <?php endif; ?>
                            <?php if (!empty($field['help'])) : ?>
                                <p class="description"><?php echo esc_html($field['help']); ?></p>
                            <?php endif; ?>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </table>
            <?php submit_button('Spara kontaktsidans texter'); ?>
        </form>
    </div>
    <?php
}

function brf_cms_contact_page_text_fields() {
    return array(
        'pageEyebrow' => array('label' => 'Sidhuvud: etikett'),
        'pageTitle' => array('label' => 'Sidhuvud: rubrik'),
        'pageDescription' => array('label' => 'Sidhuvud: ingress', 'type' => 'textarea'),
        'emailCardTitle' => array('label' => 'Kort: e-post titel'),
        'phoneCardTitle' => array('label' => 'Kort: telefon titel'),
        'expeditionCardTitle' => array('label' => 'Kort: expedition titel'),
        'boardEyebrow' => array('label' => 'Styrelse: etikett'),
        'boardTitle' => array('label' => 'Styrelse: rubrik'),
        'boardDescription' => array('label' => 'Styrelse: ingress', 'type' => 'textarea'),
        'responsibilityEyebrow' => array('label' => 'Ansvar: etikett'),
        'responsibilityTitle' => array('label' => 'Ansvar: rubrik'),
        'expeditionEyebrow' => array('label' => 'Expedition: etikett'),
        'expeditionTitle' => array('label' => 'Expedition: rubrik'),
        'addressCardTitle' => array('label' => 'Kort: adress titel'),
        'telephoneHoursCardTitle' => array('label' => 'Kort: telefontid titel'),
        'officeYearEyebrow' => array('label' => 'Oppettider: etikett'),
        'officeTitle' => array('label' => 'Oppettider: rubrik'),
        'officeDescription' => array('label' => 'Oppettider: ingress', 'type' => 'textarea'),
        'formEyebrow' => array('label' => 'Formular: etikett'),
        'formTitle' => array('label' => 'Formular: rubrik'),
        'formDescription' => array('label' => 'Formular: ingress', 'type' => 'textarea'),
        'contactPanelTitle' => array('label' => 'Mork kontaktbox: rubrik'),
        'contactPanelEmailLabel' => array('label' => 'Mork kontaktbox: e-post etikett'),
        'contactPanelPhoneLabel' => array('label' => 'Mork kontaktbox: telefon etikett'),
        'contactPanelExpeditionLabel' => array('label' => 'Mork kontaktbox: expedition etikett'),
        'formLoadingText' => array('label' => 'Formular: laddningstext'),
        'formIntroBeforeEmail' => array('label' => 'Formular: intro fore e-post', 'type' => 'textarea'),
        'formIntroAfterEmail' => array('label' => 'Formular: intro efter e-post'),
        'formCaseTypeLabel' => array('label' => 'Formular: arendetyp etikett'),
        'formCaseTypes' => array('label' => 'Formular: arendetyper', 'help' => 'Skriv alternativen separerade med kommatecken, exempel: Felanmalan, Fraga till styrelsen, Parkering'),
        'formFaultAlertTitle' => array('label' => 'Felanmalan-ruta: rubrik'),
        'formFaultAlertBeforePhone' => array('label' => 'Felanmalan-ruta: text fore telefon', 'type' => 'textarea'),
        'formFaultAlertAfterPhone' => array('label' => 'Felanmalan-ruta: text efter telefon', 'type' => 'textarea'),
        'formNameLabel' => array('label' => 'Formular: namn etikett'),
        'formEmailLabel' => array('label' => 'Formular: e-post etikett'),
        'formAddressLabel' => array('label' => 'Formular: adress etikett'),
        'formMessageLabel' => array('label' => 'Formular: meddelande etikett'),
        'formFileLabel' => array('label' => 'Formular: bifoga fil etikett'),
        'formFileHelpText' => array('label' => 'Formular: filhjalp', 'type' => 'textarea'),
        'formSelectedFileLabel' => array('label' => 'Formular: vald fil etikett'),
        'formFileTypeError' => array('label' => 'Formular: fel filtyp', 'type' => 'textarea'),
        'formFileSizeError' => array('label' => 'Formular: for stor fil', 'type' => 'textarea'),
        'formSubmitLabel' => array('label' => 'Formular: knapptext'),
        'formSubmitAlert' => array('label' => 'Formular: tackmeddelande', 'type' => 'textarea'),
    );
}

function brf_cms_register_rest_routes() {
    register_rest_route('brf/v1', '/contact', array(
        'methods' => 'GET',
        'callback' => 'brf_cms_get_contact_rest',
        'permission_callback' => '__return_true',
    ));

    register_rest_route('brf/v1', '/contact-page-texts', array(
        'methods' => 'GET',
        'callback' => 'brf_cms_get_contact_page_texts_rest',
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

function brf_cms_get_contact_page_texts_rest() {
    $fields = brf_cms_contact_page_text_fields();
    $data = array();

    foreach ($fields as $key => $field) {
        $data[$key] = get_option($key, '');
    }

    return rest_ensure_response($data);
}
