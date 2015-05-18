/* global jQuery, PhotoSwipe */
( function( $, PhotoSwipe ){

	var ProductsLightbox = {

		init: function() {

			this.bindEvents();

		},

		bindEvents: function() {

			var self = this;
			$( '[data-lightbox]' ).on( 'click', function( evt ){
				evt.preventDefault();
				self.openLightbox( $( this ) );
			} );

		},

		openLightbox: function( clicked_el ) {

			var all_items = $( '[data-lightbox]' ),
				index = all_items.index( clicked_el ) || 0,
				items = [];

			all_items.each( function( index, el ){
				el = $( el );
				items.push( {
					src: el.attr( 'href' ),
					w: 500,
					h: 500
				} );
			} );

			var ps = new PhotoSwipe( $( '.pswp' )[0], PhotoSwipeUI_Default, items, { index: index } );
			ps.init();

		}

	};


	$( function() {
		//DOM ready

		Object.create( ProductsLightbox ).init();

	} );

} )( jQuery, PhotoSwipe );