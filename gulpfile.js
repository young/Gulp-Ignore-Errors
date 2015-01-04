var gulp = require('gulp');
var ignoreErrors = require('./ignore-errors');
var using = require('gulp-using');

gulp.task('default', function() {
  gulp.src('demo.js')
  
  .pipe(ignoreErrors())
  .pipe(gulp.dest('output'));

});