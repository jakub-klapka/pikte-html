/* global jQuery */
( function( $ ){

	$( function(){

		$( '.products_slider__products' ).owlCarousel( {
			items: 1,
			dots: true,
			nav: true,
			slideBy: 'page',
			dotsContainer: '.products_slider__nav__dots',
			navContainer: '.products_slider__nav__prevnext',
			navText: [
				'<svg><use xlink:href="#svg-products_slider_left"></use></svg>',
				'<svg><use xlink:href="#svg-products_slider_right"></use></svg>'
			],
			responsive: {
				668: {
					items: 2
				},
				968: {
					items: 3
				},
				1280: {
					items: 4
				}
			}
		} );

	} );

} )( jQuery );