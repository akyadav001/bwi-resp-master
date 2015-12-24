var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var config = require('../../config');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
gulp.task('build:styles', function(){
	return gulp
	.src(config.globs.styles.build)
	.pipe(plumber())
	.pipe(less({
		paths: ['bower_components', config.source.styles]
	}))
	.pipe(autoprefixer({
		browsers: config.browserList
	}))
	.pipe(gulp.dest(config.destination.styles));
});