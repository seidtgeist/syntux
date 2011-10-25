var common = require('../common');
var Syntux = common.Syntux;
var assert = require('assert');

(function testDoubleQuotesToSingleQuotes() {
  var source = Syntux.transform('foo("bar")', {quotes: '\''});
  assert.equal(source, 'foo(\'bar\')');
})();

(function testEscapedQuote() {
  var source = Syntux.transform('foo("b\\"ar")', {quotes: '\''});
  assert.equal(source, 'foo(\'b"ar\')');
})();

(function testUnescapedQuote() {
  var source = Syntux.transform('foo("b\'ar")', {quotes: '\''});
  assert.equal(source, 'foo(\'b\\\'ar\')');
})();
