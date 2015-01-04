/*jshint node: true */
'use strict';

var fs = require('fs');
var through = require('through2');

var PLUGIN_NAME = 'gulp-ignore-errors';

function gulpIgnoreErrors() {
 // var writer = fs.createWriteStream(file, {'flags': 'a'});
  // use {'flags': 'a'} to append and {'flags': 'w'} to erase and write a new file
 //'' writer.end("this is a message");
  var beginning = 'try { /n';
  var ending = '/n =}/n catch () { /n // pass /n }';


  // creating a stream through which each file will pass
  var stream = through.obj(function(file, enc, cb) {
    if (file.isBuffer()) {
      beginning = new Buffer(beginning);
      ending = new Buffer(ending);
      file.contents = Buffer.concat([beginning, file.contents, ending]);
    }


    if (file.isStream()) {
      var streamer = through();
      streamer.write(beginning);
      // catch errors from the streamer and emit a gulp plugin error
      streamer.on('error', this.emit.bind(this, 'error'));
      // start the transformation
      file.contents = file.contents.pipe(streamer);
    }

    this.push(file);
    cb();
  });

  // returning the file stream
  return stream;
}


// API
module.exports = gulpIgnoreErrors;