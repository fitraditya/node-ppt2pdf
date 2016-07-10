"use strict";

var childprocess = require('child_process');
var fs = require('fs');
var path = require('path');

var opts = {
  output: null,
  outputdir: null,
  pagerange: null
};

var Ppt2Pdf = function() {};

Ppt2Pdf.prototype.convert = function(input, options, callback) {
  switch (path.extname(path.basename(input))) {
    case '.odp':
    case '.ppt':
    case '.pptx': if (!isFileExists(input)) {
      return callback({
        result: 'error',
        message: 'Input file not found.'
      });
    } break;
    default: return callback({
      result: 'error',
      message: 'Unsupported file type.'
    }); break;
  }

  if (!options) {
    options = {};
  }

  opts.output = options.output || opts.output;
  opts.outputdir = options.outputdir || opts.outputdir;
  opts.pagerange = options.pagerange || opts.pagerange;

  var stdout = [];
  var stderr = [];

  var args = [
    '-fpdf',
    '--stdout'
  ];

  if (opts.pagerange) {
    args.push('-e', 'PageRange=' + opts.pagerange);
  }

  if (!opts.output) {
    var out = path.basename(input, path.extname(path.basename(input)));
    opts.output = out + '.pdf'
  }

  if (opts.outputdir) {
    if (!isDirExists(opts.outputdir)) {
      fs.mkdirSync(opts.outputdir);
    }

    opts.outputdir = opts.outputdir + '/';
  } else {
    opts.outputdir = '';
  }

  args.push(input);

  var child = childprocess.spawn('unoconv', args);

  child.stdout.on('data', function(data) {
    stdout.push(data);
  });

  child.stderr.on('data', function(data) {
    stderr.push(data);
  });

  child.on('exit', function() {
    if (stderr.length) {
      return callback({
        result: 'error',
        message: Buffer.concat(stderr).toString().trim()
      });
    }

    var buffer = Buffer.concat(stdout);

    fs.writeFile(opts.outputdir + opts.output, buffer);

    callback(null, {
      result: 'success',
      message: path.basename(opts.output),
    });
  });
};

var isDirExists = function(path) {
  try {
    return fs.statSync(path).isDirectory();
  } catch (e) {
    return false;
  }
}

var isFileExists = function(path) {
  try {
    return fs.statSync(path).isFile();
  } catch (e) {
    return false;
  }
}

module.exports = new Ppt2Pdf;
