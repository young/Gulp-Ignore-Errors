Gulp Ignore Errors
==========

> Ignore all Javascript errors


## Installation

Install package with NPM and add it to your development dependencies:

`npm install --save-dev gulp-ignore-errors`

## Usage

Best used in conjunction with gulp-concat and gulp-uglify in order
to silence errors in your production Javascript.

```javascript
var gulp = require('gulp');
var ignoreErrors = require('gulp-ignore-errors');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('default', function() {
  gulp.src('demo.js')
  .concat()
  .pipe(ignoreErrors())
  .pipe(uglify())
  .pipe(gulp.dest('output'));
});
```