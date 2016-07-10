"use strict";

var fs      = require('fs');
var should  = require('chai').should();
var ppt2pdf = require('../index.js');

var input1  = __dirname + '/test.odp';
var input2  = __dirname + '/test123.odp';

var options = {
  outputdir: __dirname + '/output'
};

describe('Covert odp into pdf', function() {
  it ('Converting while input file exists', function(done) {
    ppt2pdf.convert(input1, options, function(err, info) {
      console.log(err);
      console.log(info);
      info.result.should.equal('success');
      info.message.should.equal('test.pdf');
      done();
    });
  });
  it ('Show error while input file not found', function(done) {
    ppt2pdf.convert(input2, options, function(err, info) {
      err.result.should.equal('error');
      err.message.should.equal('Input file not found.');
      done();
    });
  });
});
