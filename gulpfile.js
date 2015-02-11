var gulp = require( 'gulp' ),
	sass = require( 'gulp-ruby-sass' ),
	autoprefixer = require( 'gulp-autoprefixer' ),
	plumber = require( 'gulp-plumber' ),
	svgstore = require( 'gulp-svgstore' ),
	imagemin = require( 'gulp-imagemin' ),
	rename = require( 'gulp-rename' ),
	ignore = require( 'gulp-ignore' ),
	merge_stream = require( 'merge-stream' ),
	livereload = require( 'gulp-livereload' );


var plumber_config = {
	errorHandler: function (err) {
		console.log(err.toString());
		this.emit('end');
	}
};

/*
CSS
 */
gulp.task( 'sass', function(){
	return gulp.src( 'src/sass/**/*.scss', { base: 'src/sass' } )
		.pipe( plumber( plumber_config ) )
		.pipe( sass( {
			style: 'expanded'
		} ) )
		.pipe( ignore.exclude( '*.map' ) )
		.pipe( autoprefixer() )
		.pipe( gulp.dest( 'dist/css' ) );
} );
gulp.task( 'sass_watch', function(){
	gulp.watch( 'src/sass/**/*', [ 'sass' ] );
} );


/*
 SVG Sprite
 */
gulp.task( 'svg', function(){
	var dirs = require( 'fs' ).readdirSync( 'src/svg' );
	var streams = merge_stream();

	dirs.forEach( function( item ) {
		var stream = gulp.src( 'src/svg/' + item + '/*.svg' )
			.pipe( plumber( plumber_config ) )
			.pipe( rename( {
				prefix: 'svg-'
			} ) )
			.pipe( imagemin() )
			.pipe( svgstore() )
			.pipe( rename( {
				prefix: 'svg_'
			} ) )
			.pipe( gulp.dest( 'dist/images' ) );

		streams.add( stream );
	} );

	return streams;

} );
gulp.task( 'svg_watch', function(){
	gulp.watch( 'src/svg_sprite/**/*', [ 'svg' ] );
} );



/*
Livereload
 */
gulp.task( 'livereload', function () {
	livereload.listen();
	gulp.watch( [ 'src/*.html', 'dist/**/*', 'src/js/**/*' ], function( evt ){
		livereload.changed( evt.path );
	} );
} );



/*
Tasks
 */
gulp.task( 'default', [ 'sass', 'svg' ] );
gulp.task( 'dev', [ 'sass_watch', 'svg_watch', 'livereload' ] );