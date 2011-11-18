var TransformHelper = require('../common').helper('transform_helper');
var helper = TransformHelper.create();

helper.test({
  description:
    'Simple brace test. No wrapping.',
  options:
    {braces: 'knr'},
  input:
    'function(){}',
  expected:
    'function(){}'
});

helper.test({
  description:
    'Simple brace test. Wrapping.',
  options:
    {braces: 'knr'},
  input:
    'function(){var foo="bar";}',
  expected:
    'function(){\nvar foo="bar";\n}\n'
});

helper.test({
  description:
    'Brace test with indentation.',
  options:
    {braces: 'knr'},
  input:
    '  \tfunction(){var foo="bar";}',
  expected:
    '  \tfunction(){\n  \tvar foo="bar";\n  \t}\n'
});

helper.test({
  description:
    'Brace test with spacing.',
  options:
    {braces: 'knr'},
  input:
    'function()\t\n {\n\t var foo="bar";}',
  expected:
    'function(){\nvar foo="bar";\n}\n'
});

helper.test({
  description:
    'Simple object',
  options:
    {braces: 'knr'},
  input:
    'a={foo:bar, bar:baz}',
  expected:
    'a={\nfoo:bar, bar:baz\n}\n'
});

helper.test({
  description:
    'More complex brace test with spacing',
  options:
    {braces: "knr"},
  input:
    'var func = function()\n\n  {  /*what*/  switch(foo)  {  case "foo":if(){if(){}}}};',
  expected:
    'var func = function(){\n/*what*/  switch(foo){\ncase "foo":if(){\nif(){}\n}\n\n}\n\n}\n;'
});

