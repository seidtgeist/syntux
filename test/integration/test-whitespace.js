var common = require('../common');
var Syntux = common.Syntux;
var assert = require('assert');

(function testRemoveTrailingWhitespace() {
  var source = Syntux.transform('    foo    \n', {whitespace: true});
  assert.equal(source, '    foo\n');
})();
