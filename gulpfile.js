'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();


/*
 * config
 */
var CONFIG = {
  watchFiles: {
    html : 'src/**/*.html',
    css  : 'src/**/*.css' ,
    sass : 'src/**/*.scss',
    js   : 'src/**/*.js',
    jpg  : 'src/**/*.jpg',
    png  : 'src/**/*.png',
    gif  : 'src/**/*.gif'
  },
  directory: {
    dev : 'src',
    release : 'dist'
  }
};

/*
 * copy html, js, css files
 */
gulp.task('copy', function(){
  return gulp.src([
    CONFIG.watchFiles.html,
    CONFIG.watchFiles.js,
    CONFIG.watchFiles.css], { base: CONFIG.directory.dev})
      .pipe(gulp.dest(CONFIG.directory.release));
});

/*
 * copy image files
 */
gulp.task('copy_images', function(){
  return gulp.src([
    CONFIG.watchFiles.jpg,
    CONFIG.watchFiles.png,
    CONFIG.watchFiles.gif], { base: CONFIG.directory.dev})
      .pipe(gulp.dest(CONFIG.directory.release))
});

/*
 * compile sass
 */
gulp.task('sass', function(){
  return gulp.src(CONFIG.watchFiles.sass, { base: CONFIG.directory.dev})
    .pipe(plumber())
    .pipe(sass({outputStyle : 'expanded'})) //nested, compact, expanded, compressed
    .pipe(gulp.dest(CONFIG.directory.release));
});

/*
 * watch
 */
gulp.task('watch', function(){
  watch([
    CONFIG.watchFiles.sass], function(event){
      gulp.start('sass');
    });
  watch([
    CONFIG.watchFiles.html,
    CONFIG.watchFiles.js,
    CONFIG.watchFiles.css], function(event){
      gulp.start('copy');
    });
  watch([
    CONFIG.watchFiles.jpg,
    CONFIG.watchFiles.png,
    CONFIG.watchFiles.gif], function(event){
      gulp.start('copy_images');
    });
});

/*
 * browser-sync
 */
gulp.task('browser-sync', function(){
  browserSync.init({
    server: {
      baseDir: CONFIG.directory.release
    }
  });
  //reload monitoring
  watch([
    CONFIG.directory.release + '/**/*'], function(event){
      gulp.start('reload');
    });

});

gulp.task('reload', function(){
  browserSync.reload();
});


gulp.task('default', ['copy', 'copy_images', 'sass', 'watch', 'browser-sync']);
