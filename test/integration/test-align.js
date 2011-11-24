var TransformHelper = require('../common').helper('transform_helper');
var helper = TransformHelper.create();

helper.test({
  description:
    'Simple alignment of two var statements',
  options:
    {align: ['=']},
  input:
    'var a = 1;\n' +
    'var muchlonger = 2;\n',
  expected:
    'var a          = 1;\n' +
    'var muchlonger = 2;\n',
});

helper.test({
  description:
    'Simple alignment of two var statement groups',
  options:
    {align: ['=']},
  input:
    'var a = 1;\n' +
    'var muchlonger = 2;\n' +
    '\n' +
    'var alsolong = 3;\n' +
    'var b = 4;\n',
  expected:
    'var a          = 1;\n' +
    'var muchlonger = 2;\n' +
    '\n' +
    'var alsolong = 3;\n' +
    'var b        = 4;\n',
});

helper.test({
  description:
    'Do not break already aligned var statements',
  options:
    {align: ['=']},
  input:
    'var a          = 1;\n' +
    'var muchlonger = 2;\n',
  expected:
    'var a          = 1;\n' +
    'var muchlonger = 2;\n'
});

helper.test({
  description:
    'Align wrongly aligned var statements',
  options:
    {align: ['=']},
  input:
    'var a                 = 1;\n' +
    'var muchlonger        = 2;\n',
  expected:
    'var a          = 1;\n' +
    'var muchlonger = 2;\n'
});

helper.test({
  description:
    'Simple alignment of of object literal',
  options:
    {align: [':']},
  input:
    'var o = {\n' +
    '  a: 1,\n' +
    '  muchlonger: 2,\n' +
    '}\n',
  expected:
    'var o = {\n' +
    '  a          : 1,\n' +
    '  muchlonger : 2,\n' +
    '}\n',
});

helper.test({
  description:
    'Align tokens that already have whitespace before them',
  options:
    {align: [':']},
  input:
    'var o = {\n' +
    '  a : 1,\n' +
    '  muchlonger : 2,\n' +
    '}\n',
  expected:
    'var o = {\n' +
    '  a          : 1,\n' +
    '  muchlonger : 2,\n' +
    '}\n',
});

helper.test({
  description:
    'Blank lines break alignment groups',
  options:
    {align: ['=']},
  input:
    'var a = 1;\n' +
    'var muchlonger = 2;\n' +
    '\n' +
    'var foo = "bar";\n',
  expected:
    'var a          = 1;\n' +
    'var muchlonger = 2;\n' +
    '\n' +
    'var foo = "bar";\n',
});

helper.test({
  description:
    'Non-assignment lines break alignment groups',
  options:
    {align: ['=']},
  input:
    'var a = 1;\n' +
    'var muchlonger = 2;\n' +
    'console.log(a)\n;' +
    'var foo = "bar";\n',
  expected:
    'var a          = 1;\n' +
    'var muchlonger = 2;\n' +
    'console.log(a)\n;' +
    'var foo = "bar";\n',
});

helper.test({
  description:
    'Multi-line assignments break grouping',
  options:
    {align: ['=']},
  input:
    'var a = 1;\n' +
    'var muchlonger = 2;\n' +
    'var c = {\n' +
    '  foo: "bar",\n' +
    '}\n',
  expected:
    'var a          = 1;\n' +
    'var muchlonger = 2;\n' +
    'var c = {\n' +
    '  foo: "bar",\n' +
    '}\n',
});


// @todo break on for (var key in, for (var = 0;
