var browserSync = require('browser-sync');
var gulp = require('gulp');
var config = require('../config');

gulp.task('server', ['watch'], function(callback) {
	browserSync.init(null, {
		files: config.destination.root + '/**/*',
		browser: 'chrome',
		port: config.port,
		notify: false,
		online: false,
		server: {
			baseDir: config.destination.root
		}
	}, callback);
});