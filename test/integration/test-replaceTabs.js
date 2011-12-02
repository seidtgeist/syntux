var TransformHelper = require('../common').helper('transform_helper');
var helper = TransformHelper.create();

helper.test({
  description:
    'Fix wrong indentation',
  options:
    {replaceTabs: '  '},
  input:
    'function foo() {\n' +
    '\treturn;\n'        +
    '}\n',
  expected:
    'function foo() {\n' +
    '  return;\n'        +
    '}\n'
});

helper.test({
  description:
    'Do not break custom indentation',
  options:
    {replaceTabs: '  '},
  input:
    '\tvar foo = 1,\n' +
    '\t    bar = 2;',
  expected:
    '  var foo = 1,\n' +
    '      bar = 2;'
});
