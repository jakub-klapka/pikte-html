/* global jQuery, Modernizr */
( function( $ ){

	var MobileMenu = {

		init: function() {

			this.header = $( '.main_header' );
			this.menu_section = $( '.main_header__menu_section' );
			this.nav = this.menu_section.find( '.main_header__menu_section__nav' );
			this.ul = this.nav.find( '.main_header__menu_section__nav__ul' );
			this.button = this.header.find( '.main_header__menu_button' );
			this.menu_open = false;

			this.bindEvents();

		},

		bindEvents: function() {

			this.checkForWrap();
			$( window ).on( 'load', $.proxy( this.checkForWrap, this ) );

			$( window ).on( 'resize', $.proxy( this.checkForWrap, this ) );

			this.button.on( 'click', $.proxy( this.buttonClicked, this ) );

		},

		checkForWrap: function() {

			this.unwrapMenu(); //to be able to accurate measure menu lengths

			var nav_width = this.nav.outerWidth(),
				ul_width = this.ul.outerWidth();


			if( nav_width <= ul_width ) {
				this.wrapMenu();
			} else {
				this.unwrapMenu();
			}

		},

		wrapMenu: function() {

			this.header.addClass( 'menu_wrapped' );

		},

		unwrapMenu: function() {

			this.header.removeClass( 'menu_wrapped' );

			if( this.menu_open ){
				this.menu_open = false;
				this.button.removeClass( 'is-active' );
			}

			this.menu_section.attr( 'style', '' );

		},

		buttonClicked: function() {

			if( this.menu_open ) {
				this.closeMenu();
			} else {
				this.openMenu();
			}

		},

		openMenu: function() {
			this.menu_open = true;
			this.menu_section.velocity( 'stop' ).velocity( 'fadeIn', { display: 'flex' } );
			this.button.addClass( 'is-active' );
		},

		closeMenu: function() {
			this.menu_open = false;
			this.menu_section.velocity( 'stop' ).velocity( 'fadeOut' );
			this.button.removeClass( 'is-active' );
		}


	};


	$( function(){
		if( Modernizr.flexbox ){
			MobileMenu.init();
		}
	} );

} )( jQuery );