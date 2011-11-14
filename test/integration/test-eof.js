var TransformHelper = require('../common').helper('transform_helper');
var helper = TransformHelper.create();

helper.test({
  description:
    'Add eof "\\n" at the end of file (with ASI)',
  options:
    {eof: '\n'},
  input:
    'foo',
  expected:
    'foo\n'
});

helper.test({
  description:
    'Add eof "\\n" at the end of file (no ASI)',
  options:
    {eof: '\n'},
  input:
    'foo;',
  expected:
    'foo;\n'
});

helper.test({
  description:
    'No appending of "\\n" at the end of file',
  options:
    {eof: '\n'},
  input:
    'foo\n',
  expected:
    'foo\n'
});

helper.test({
  description:
    'Don\'t append "\\r\\n" at the end of file that ends with "\\r\\n"',
  options:
    {eof: '\r\n'},
  input:
    'foo\r\n',
  expected:
    'foo\r\n'
});

helper.test({
  description:
    'Add "\\r\\n" at the end of file that ends with "\\n"',
  options:
    {eof: '\r\n'},
  input:
    'foo\n',
  expected:
    'foo\n\r\n'
});

helper.test({
  description:
    'Add eof "\\r\\n" at the end of file',
  options:
    {eof: '\r\n'},
  input:
    'foo',
  expected:
    'foo\r\n'
});

helper.test({
  description:
    'Add "\\n" + comment + "\\n" at the end of a file',
  options:
    {eof: '\n\/*A comment*\/\n'},
  input:
    'foo',
  expected:
    'foo\n\/*A comment*\/\n'
});

helper.test({
  description:
    'Add eof "\\n" at the end of an empty file',
  options:
    {eof: '\n'},
  input:
    '',
  expected:
    '\n'
});
