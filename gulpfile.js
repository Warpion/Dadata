const gulp = require('gulp');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

const cssFiles = [
	'./view/libs/bootstrap/bootstrap.min.css',
	'./view/scss/style.scss',
	'./view/scss/media.scss',
];

const jsFiles = [
	'./view/libs/jquery/jquery-3.4.1.min.js',
	'./view/libs/bootstrap/bootstrap.min.js',
	'./view/js/script.js'
];

function styles(){
	return gulp.src(cssFiles)
		.pipe(sass().on('error', sass.logError))
		.pipe(concat('style.css'))
		.pipe(autoprefixer({
			overrideBrowserslist:  ['last 2 versions'],
			browsers: ['> 0.1%']
		}))
		.pipe(cleanCSS({
			level: 2
		}))
		.pipe(gulp.dest('./'))
		.pipe(browserSync.stream())
}
function scripts(){
	return gulp.src(jsFiles)
				.pipe(concat('script.js'))
				.pipe(gulp.dest('./'))
				.pipe(browserSync.stream())
}
function reload(done) {
  browserSync.reload();
  done();
}

function watch(){
	browserSync.init({
        server: {
            baseDir: "./"
        }
	});

	gulp.watch('./view/scss/*.scss',styles);
	gulp.watch('./view/js/*.js',scripts);
	gulp.watch('./*.html',reload);
}

gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('watch', watch);