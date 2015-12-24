var gulp = require('gulp');
var changed = require('gulp-changed');
var fileinclude = require('gulp-file-include');
var config = require('../../config');

gulp.task('build:assets', function() {
	return gulp
	.src(config.globs.assets)
    .pipe(changed(config.destination.assets))
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
  }))
	.pipe(gulp.dest(config.destination.assets))
});