// Gulp
const { src, dest, watch, series } = require('gulp');

// CSS
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

// HTML
const htmlmin = require('gulp-htmlmin');

// Images
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');


function css( done ) {
    src('css/*.css')
        .pipe( postcss([ autoprefixer(), cssnano() ]) )
        .pipe( dest( 'build/css' ) );
    
    done()
};

function html() {
    const options = { 
        collapseWhitespace: true, 
        removeComments: true 
    }
    return src('*.html')
        .pipe( htmlmin( options ))
        .pipe( dest('build') );
}

function images() {
    return src('img/*')
        .pipe( imagemin() )
        .pipe( dest('build/img') );
}

function imagesWebp() {
    const options = {
        quality: 50
    }
    return src('img/*.{png,jpg}')
        .pipe( webp( options ) )
        .pipe( dest('build/img') )
}

function imagesAvif() {
    const options = {
        quality: 50
    }
    return src('img/*.{png,jpg}')
        .pipe( avif( options ) )
        .pipe( dest('build/img'))
}

function dev() {
    watch( 'css/*.css', css );
    watch( '*.html', html );
    watch( 'img/*', images );
}

exports.css = css;
exports.dev = dev;
exports.html = html;
exports.images = images;
exports.imagesWebp = imagesWebp;
exports.imagesAvif = imagesAvif;
exports.default = series( images, imagesWebp, imagesAvif, html, css, dev );