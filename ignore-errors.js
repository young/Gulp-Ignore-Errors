/*jshint node: true */
'use strict';

var fs = require('fs');
var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

var PLUGIN_NAME = 'gulp-ignore-errors';

function gulpIgnoreErrors() {
 // var writer = fs.createWriteStream(file, {'flags': 'a'});
  // use {'flags': 'a'} to append and {'flags': 'w'} to erase and write a new file
 //'' writer.end("this is a message");
  var beginning = 'try { \n';
  var ending = '\n }\n catch () { \n // pass \n }';
  beginning = new Buffer(beginning);
  ending = new Buffer(ending);

  // creating a stream through which each file will pass
  var stream = through.obj(function(file, enc, cb) {
    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
      return cb();
    }

    if (file.isBuffer()) {
      file.contents = Buffer.concat([beginning, file.contents]);
      file.contents = Buffer.concat([file.contents, ending]);
    }

    // make sure the file goes through the next gulp plugin
    this.push(file);

    // tell the stream engine that we are done with this file
    cb();
  });

  // returning the file stream
  return stream;
}


// API
module.exports = gulpIgnoreErrors;