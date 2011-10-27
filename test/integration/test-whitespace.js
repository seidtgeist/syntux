var TransformHelper = require('../common').helper('transform_helper');
var helper = TransformHelper.create();

helper.test({
  description:
    'Remove trailing whitespace',
  options:
    {whitespace: true},
  input:
    '    foo    ',
  expected:
    '    foo'
});

helper.test({
  description:
    'Remove trailing whitespace in a comment',
  options:
    {whitespace: true},
  input:
    '    // foo    \n',
  expected:
    '    // foo\n'
});

helper.test({
  description:
    'Remove trailing whitespace in a multiline comment',
  options:
    {whitespace: true},
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

