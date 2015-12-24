var gulp = require('gulp');
var cheerio = require('gulp-cheerio');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var config = require('../../config');

gulp.task('build:icons', function() {
   return gulp.src(config.globs.icons)
   .pipe(svgstore())
   .pipe(cheerio(function ($) {
         $('svg').attr('xmlns:xlink', 'http://www.w3.org/1999/xlink');
         $('[fill]').removeAttr('fill');
         $('[style]').remove();
         $('path').removeAttr('id').removeAttr('class');
   }))
   .pipe(svgmin({
      js2svg: {
                pretty: true
      }
   }))
   .pipe(gulp.dest(config.destination.icons));
   });
