<?php
/**
 * Sample implementation of the Custom Header feature
 *
 * You can add an optional custom header image to header.php like so ...
 *
	<?php the_header_image_tag();
 *
 * @link https://developer.wordpress.org/themes/functionality/custom-headers/
 *
 * @package Marsh Music
 */

/**
 * Set up the WordPress core custom header feature.
 *
 * @uses marsh_music_header_style()
 */
function marsh_music_custom_header_setup() {
	add_theme_support( 'custom-header', apply_filters( 'marsh_music_custom_header_args', array(
		'default-image'          => '',
		'default-text-color'     => 'fb3a64',
		'width'                  => 1620,
		'height'                 => 620,
		'flex-height'            => true,
		'wp-head-callback'       => 'marsh_music_header_style',
	) ) );

	// Register default headers.
	register_default_headers( array(
		'default-banner' => array(
			'url'           => '%s/assets/images/default-header.jpg',
			'thumbnail_url' => '%s/assets/images/default-header.jpg',
			'description'   => esc_html_x( 'Default Banner', 'header image description', 'marsh-music' ),
		),

	) );
}
add_action( 'after_setup_theme', 'marsh_music_custom_header_setup' );

function marsh_music_header_style() {
	$header_text_color = get_header_textcolor();

	/*
	 * If no custom options for text are set, let's bail.
	 * get_header_textcolor() options: Any hex value, 'blank' to hide text. Default: HEADER_TEXTCOLOR.
	 */
	if ( get_theme_support( 'custom-header', 'default-text-color' ) === $header_text_color ) {
		return;
	}

	// If we get this far, we have custom styles. Let's do this.
	// Has the text been hidden?
	if ( ! display_header_text() ) :
		$custom_css = ".site-title,
		.site-description {
			position: absolute;
			clip: rect(1px, 1px, 1px, 1px);
		}";
	// If the user has set a custom color for the text use that.
	else :
		$custom_css = ".site-title a,
		.site-description {
			color: #" . esc_attr( $header_text_color ) . "}";
	endif;
	wp_add_inline_style( 'marsh-music-style', $custom_css );
}
add_action( 'wp_enqueue_scripts', 'marsh_music_header_style' );