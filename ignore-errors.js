/*jshint node: true */
'use strict';

var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

var PLUGIN_NAME = 'gulp-ignore-errors';

/**
 * Wraps a file in a try/catch block
 * @return {Object} The file
 */
function gulpIgnoreErrors() {
  var beginning = 'try { \n';
  var ending = '\n }\n catch (e) { \n // pass \n }';

  // Create Buffers
  beginning = new Buffer(beginning);
  ending = new Buffer(ending);

  var stream = through.obj(function(file, enc, cb) {
    // Don't use streams
    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
      return cb();
    }

    if (file.isBuffer()) {
      file.contents = Buffer.concat([beginning, file.contents]);
      file.contents = Buffer.concat([file.contents, ending]);
    }

    this.push(file);

    cb();
  });

  return stream;
}

// API
module.exports = gulpIgnoreErrors;
