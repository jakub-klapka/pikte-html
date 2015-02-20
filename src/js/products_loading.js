/* global jQuery */
( function( $ ){

	var ProductsLoading = {

		init: function() {

			this.container = $( '.portfolio__products_container:first' );
			this.load_button = $( '.portfolio__load_more:first' );
			this.loading = false;
			this.request_url = LumiProductsLoading.request_url || false;
			this.current_page = 1;
			this.product_template = $( '#products_template' ).html();

			this.bindEvents();
		},

		bindEvents: function() {

			this.load_button.on( 'click', $.proxy( this.loadRequested, this ) );

		},

		loadRequested: function() {

			if( this.loading ) return;
			this.loading = true;

			this.load_button.addClass( 'is-disabled' );

			var load_deffered = $.Deferred();

			var t = this;
			setTimeout( function(){ //TODO: DEBUG ONLY!
				t.loadNewContent( load_deffered );
			}, 1000 );

			var t = this;
			load_deffered.done( function(){
				t.current_page++;
				t.load_button.removeClass( 'is-disabled' );
				t.loading = false;
			} );

		},

		loadNewContent: function( deffered ) {

			var xhr = $.ajax( {
				data: {
					action: 'lumi_load_more_products',
					page: ( this.current_page + 1 )
				},
				dataType: 'json',
				type: 'POST',
				url: this.request_url
			} );

			xhr.done( $.proxy( this.fillInData, this, xhr, deffered ) );

		},

		fillInData: function( xhr, deffered ) {

			var response = xhr.responseJSON;

			if( response.status === 'ok' || response.status === 'last_page' ) {
				var to_append = [];
				var t = this;
				$.each( response.data, function( index, item ){

					var item_html = t.product_template;
					item_html = item_html.replace( /\{\{url\}\}/g, item.url )
						.replace( /\{\{img_src\}\}/g, item.img_src )
						.replace( /\{\{img_alt\}\}/g, item.img_alt )
						.replace( /\{\{name\}\}/g, item.name );

					to_append.push( $( item_html ) );

				} );
				this.container.append( to_append );

				if( response.status === 'last_page' ) {
					this.load_button.remove();
				}
			}
			if( response.status === 'error' ){
				console.log( 'Loading error: ' + response.error );
				alert( 'Chyba načítání, prosím kontaktujte nás a my se na to mrkneme.' );
			}

			deffered.resolve();

		}

	};


	$( function() {
		ProductsLoading.init();
	} );


} )( jQuery );