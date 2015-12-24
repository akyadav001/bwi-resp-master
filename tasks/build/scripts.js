var gulp = require('gulp');
var config = require('../../config');

gulp.task('build:scripts', function() {
	return gulp
	.src(config.globs.scripts)
	.pipe(gulp.dest(config.destination.scripts))
});