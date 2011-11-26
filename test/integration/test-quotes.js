var TransformHelper = require('../common').helper('transform_helper');
var helper = TransformHelper.create();

helper.test({
  description:
    'Double quotes to single quotes',
  options:
    {quotes: '\''},
  input:
    'foo("bar")',
  expected:
    'foo(\'bar\')'
});

helper.test({
  description:
    'Escaped Quote',
  options:
    {quotes: '\''},
  input:
    'foo("b\\"ar")',
  expected:
    'foo(\'b"ar\')'
});

helper.test({
  description:
    'Unescaped Quote',
  options:
    {quotes: '\''},
  input:
    'foo("b\'ar")',
  expected:
    'foo(\'b\\\'ar\')'
});
