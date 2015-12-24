var gulp = require('gulp');
var changed = require('gulp-changed');
var clean = require('gulp-clean');

var config = require('../../config');

gulp.task('clean-scripts', function () {
  return gulp.src(config.destination.images + '/images', {read: false})
    .pipe(clean({force: true}));
});

gulp.task('build:images', ['clean-scripts'], function() {
	return gulp
	.src(config.globs.images)
	.pipe(changed(config.destination.images))
	.pipe(gulp.dest(config.destination.images))
});