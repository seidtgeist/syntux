var common = require('../common');
var Syntux = common.Syntux;
var assert = require('assert');

(function testRemoveTrailingWhitespace() {
  var source = Syntux.transform('    foo    \n', {whitespace: true});
  assert.equal(source, '    foo\n');
})();

(function testRemoveTrailingWhitespaceCommentSingle() {
  var source = Syntux.transform('    // foo    \n', {whitespace: true});
  assert.equal(source, '    // foo\n');
})();

(function testRemoveTrailingWhitespaceCommentMulti() {
  var dirty = '  /*       \n' +
              '    foo    \n' +
              '    bar    \n' +
              '  */       \n' +
              '    \n';
  var clean = '  /*\n' +
              '    foo\n' +
              '    bar\n' +
              '  */\n' +
              '\n';
  var source = Syntux.transform(dirty, {whitespace: true});
  assert.equal(source, clean);
})();
