'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();

/*
 * copy html, js, css files
 */
gulp.task('copy', function(){
  return gulp.src(['./src/**/*.html', './src/**/*.js', './src/**/*.css'], { base: 'src'})
      .pipe(gulp.dest('./dist'));
});

/*
 * copy image files
 */
gulp.task('copy_images', function(){
  return gulp.src(['./src/**/*.jpg', './src/**/*.png', './src/**/*.gif'], { base: 'src'})
      .pipe(gulp.dest('./dist'))
});

/*
 * compile sass
 */
gulp.task('sass', function(){
  return gulp.src('src/**/*.scss', { base: 'src'})
    .pipe(plumber())
    .pipe(sass({outputStyle : 'expanded'}))
    .pipe(gulp.dest('./dist'));
});

/*
 * watch
 */
gulp.task('watch', function(){
  watch([
    'src/**/*.scss'], function(event){
      gulp.start('sass');
    });
  watch([
    'src/**/*.js',
    'src/**/*.html',
    'src/**/*.css'], function(event){
      gulp.start('copy');
    });
  watch([
    'src/**/*.jpg',
    'src/**/*.png',
    'src/**/*.gif'], function(event){
      gulp.start('copy_images');
    });
});

/*
 * browser-sync
 */
gulp.task('browser-sync', function(){
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });
  //reload monitoring
  watch([
    'dist/**/*'], function(event){
      gulp.start('reload');
    });

});

gulp.task('reload', function(){
  browserSync.reload();
});


gulp.task('default', ['copy', 'copy_images', 'sass', 'watch', 'browser-sync']);
