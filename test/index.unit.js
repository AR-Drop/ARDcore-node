'use strict';

var should = require('chai').should();

describe('Index Exports', function() {
  it('will export ARDcore-lib', function() {
    var ARDcore = require('../');
    should.exist(ARDcore.lib);
    should.exist(ARDcore.lib.Transaction);
    should.exist(ARDcore.lib.Block);
  });
});
