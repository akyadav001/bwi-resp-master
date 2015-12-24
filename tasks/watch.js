'use strict';

var gulp = require('gulp');
var config = require('../config');

gulp.task('watch', function() {
	gulp.watch(config.globs.assets, ['build:assets']);
	gulp.watch(config.globs.images, ['build:images']);
	gulp.watch(config.globs.styles.watch, ['build:styles']);
	gulp.watch(config.globs.scripts, ['build:scripts']);
});


