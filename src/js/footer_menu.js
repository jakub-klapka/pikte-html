/* global jQuery */
( function( $ ){

	var FooterMenu = {

		init: function() {

			this.footer = $( '.main_footer' );
			this.wrapper = this.footer.find( '.width_wrap' );
			this.copy = this.wrapper.find( '.main_footer__copy' );
			this.menu = this.wrapper.find( '.main_footer__menu' );

			this.bindEvents();

		},

		bindEvents: function() {

			this.checkForWrap();
			$( window ).on( 'load', $.proxy( this.checkForWrap, this ) );

			$( window ).on( 'resize', $.proxy( this.checkForWrap, this ) );

		},

		checkForWrap: function() {

			this.unwrapMenu(); //to be able to accurate measure menu lengths

			var footer_width = this.wrapper.width(),
				copy_width = this.copy.outerWidth(),
				menu_width = this.menu.outerWidth();


			if( ( copy_width + menu_width ) >= footer_width ) {
				this.wrapMenu();
			} else {
				this.unwrapMenu();
			}

		},

		wrapMenu: function() {

			this.footer.addClass( 'is-wrapped' );

		},

		unwrapMenu: function() {

			this.footer.removeClass( 'is-wrapped' );

		}


	};


	$( function(){
		FooterMenu.init();
	} );

} )( jQuery );