Ignore Errors
==========


Usage
--------
	var gulp = require('gulp');
	var ignoreErrors = require('gulp-ignore-errors');

	gulp.task('default', function() {
	  gulp.src('demo.js')
	  
	  .pipe(ignoreErrors())
	  .pipe(gulp.dest('output'));

	});