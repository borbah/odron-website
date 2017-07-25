/* File: gulpfile.js */
require('es6-promise').polyfill();
// grab our packages
var gulp   = require('gulp'),
    jshint = require('gulp-jshint'),
    sass   = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    plumber = require('gulp-plumber'),
    notify = require("gulp-notify"),
    cleanCSS = require('gulp-clean-css'),

    jsSrc = 'js/**/*.js',
    scssSrc = 'scss/*.scss',
    mainScss = 'scss/main.scss',
    cssPub = 'css';


// configure the jshint task
gulp.task('jshint', function() {
  return gulp.src(jsSrc)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// configure the sass task
gulp.task('sass', function() {
  return gulp.src(mainScss)

    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 4 version'))
    .pipe(sourcemaps.write())
    .pipe(cleanCSS({compatibility: '*'}))
    .pipe(gulp.dest(cssPub))
    .pipe(browserSync.stream());
});


// configure which files to watch and what tasks to use on file changes & setup BrowserSync
gulp.task('watch', function() {
  browserSync.init({
                server: {
                        baseDir: "./"
                 }
        });
  gulp.watch("*.html").on('change', browserSync.reload);

  gulp.watch(jsSrc, ['jshint']);
  gulp.watch(scssSrc, ['sass']);

});
