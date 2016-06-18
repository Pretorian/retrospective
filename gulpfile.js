'use strict';

var babel = require('gulp-babel');
var gulp = require('gulp');
var stylus = require('gulp-stylus');
var webpack = require('webpack-stream');
var config = {
  assets: __dirname + '/app/assets/',
  dist: __dirname + '/public/'
};

gulp.task('styles', function() {
  return gulp.src(config.assets + 'stylesheets/main.styl')
    .pipe(stylus())
    .pipe(gulp.dest(config.dist + 'stylesheets/'));
});

gulp.task('scripts', function() {
  return gulp.src('src/entry.js')
    .pipe(webpack(require('./webpack.config.js')(config)))
    .pipe(gulp.dest('.'));
});

gulp.task('watch', function() {
  gulp.watch([config.assets + 'javascripts/**/*.js', config.assets + 'javascripts/**/*.jsx'], ['scripts']);
  gulp.watch(config.assets + 'stylesheets/**/*.styl', ['styles']);
});

gulp.task('default', ['styles', 'scripts']);
