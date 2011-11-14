var TransformHelper = require('../common').helper('transform_helper');
var helper = TransformHelper.create();

helper.test({
  description:
    'Add missing semicolon',
  options:
    {addSemicolons: true},
  input:
    'var foo',
  expected:
    'var foo;'
});

helper.test({
  description:
    'Add multiple missing semicolons',
  options:
    {addSemicolons: true},
  input:
    'var foo = 1,\n'               +
    '    bar = 2,\n'               +
    '    baz = 3,\n'               +
    '\n'                           +
    '    lol = 4,\n'               +
    '\n'                           +
    '    meh = function foo() {\n' +
    '      bar()\n'                +
    '      return\n'               +
    '    }\n',
  expected:
    'var foo = 1,\n'               +
    '    bar = 2,\n'               +
    '    baz = 3,\n'               +
    '\n'                           +
    '    lol = 4,\n'               +
    '\n'                           +
    '    meh = function foo() {\n' +
    '      bar();\n'               +
    '      return;\n'              +
    '    };\n'
});
