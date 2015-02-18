/* global jQuery */
( function( $ ){

	$( function() {

		$( '.testimonials__slider' ).owlCarousel( {
			items: 1,
			dots: true,
			nav: true,
			dotsContainer: '.testimonials__nav__dots',
			navContainer: '.testimonials__nav__prevnext',
			navText: [
				'<svg><use xlink:href="#svg-products_slider_left"></use></svg>',
				'<svg><use xlink:href="#svg-products_slider_right"></use></svg>'
			],
			autoplay: true,
			autoplayTimeout: 10000,
			autoplayHoverPause: true,
			autoplaySpeed: 2000
		} );

	} );

} )( jQuery );