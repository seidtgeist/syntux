var TransformHelper = require('../common').helper('transform_helper');
var helper = TransformHelper.create();

helper.test({
  description:
    'Remove trailing whitespace',
  options:
    {trimWhitespace: true},
  input:
    '    foo    ',
  expected:
    '    foo'
});

helper.test({
  description:
    'Remove trailing whitespace from inside a comment',
  options:
    {trimWhitespace: true},
  input:
    '    // foo    \n',
  expected:
    '    // foo\n'
});

helper.test({
  description:
    'Remove trailing whitespace from inside a multiline comment',
  options:
    {trimWhitespace: true},
  input:
    '  /*       \n' +
    '    foo    \n' +
    '    bar    \n' +
    '  */       \n' +
    '    ',
  expected:
    '  /*\n' +
    '    foo\n' +
    '    bar\n' +
    '  */\n'
});


helper.test({
  description:
    'Do not remove newlines from multiline comments',
  options:
    {trimWhitespace: true},
  input:
    '/*\n' +
    'foo\n' +
    '\n' +
    'bar\n' +
    '*/',
  expected:
    '/*\n' +
    'foo\n' +
    '\n' +
    'bar\n' +
    '*/'
});
