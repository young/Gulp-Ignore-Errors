var gulp = require('gulp');
var ignoreErrors = require('./ignore-errors');
var using = require('gulp-using');

gulp.task('default', function() {
  gulp.src('demo.js', { buffer: false })
  
  .pipe(ignoreErrors())
  .pipe(gulp.dest('output'));

});