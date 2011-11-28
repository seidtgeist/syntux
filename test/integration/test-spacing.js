var TransformHelper = require('../common').helper('transform_helper');
var helper = TransformHelper.create();

helper.test({
  description:
    'Test string configuration',
  options:
    {spacing: 'node'},
  input:
    'function foo (bar, baz){};',
  expected:
    'function foo(bar, baz) {};'
});

helper.test({
  description:
    'Test method declaration no spacing (before)',
  options:
    {spacing: {before: {methodDeclaration: false}}},
  input:
    'function foo (bar, baz){};',
  expected:
    'function foo(bar, baz){};'
});

helper.test({
  description:
    'Test method declaration spacing (before)',
  options:
    {spacing: {before: {methodDeclaration: true}}},
  input:
    'function foo(bar, baz){};',
  expected:
    'function foo (bar, baz){};'
});

helper.test({
  description:
    'Test method call spacing (before)',
  options:
    {spacing: {before: {methodCall: true}}},
  input:
    'var foo = bar();',
  expected:
    'var foo = bar ();'
});

helper.test({
  description:
    'Test method call no spacing (before)',
  options:
    {spacing: {before: {methodCall: false}}},
  input:
    'var foo = bar ();',
  expected:
    'var foo = bar();'
});

helper.test({
  description:
    'Test statement spacing (before)',
  options:
    {spacing: {before: {statement: true}}},
  input:
    'while(a){};',
  expected:
    'while (a){};'
});

helper.test({
  description:
    'Test statement no spacing (before)',
  options:
    {spacing: {before: {statement: false}}},
  input:
    'if (a){};',
  expected:
    'if(a){};'
});

helper.test({
  description:
    'Test braces no spacing (before)',
  options:
    {spacing: {before: {braces: false}}},
  input:
    'if(a) {};',
  expected:
    'if(a){};'
});

helper.test({
  description:
    'Test braces spacing (before)',
  options:
    {spacing: {before: {braces: true}}},
  input:
    'function foo(){};',
  expected:
    'function foo() {};'
});

helper.test({
  description:
    'Test braces spacing with do (before)',
  options:
    {spacing: {before: {braces: true}}},
  input:
    'do{\n'+
    '}while(foo);',
  expected:
    'do {\n'+
    '}while(foo);'
});

helper.test({
  description:
    'Test braces no spacing (before) on object literal',
  options:
    {spacing: {before: {braces: false}}},
  input:
    'function foo() {};var bar =   {};',
  expected:
    'function foo(){};var bar =   {};',
});

helper.test({
  description:
    'Test case colon spacing (before)',
  options:
    {spacing: {before: {caseColon: true}}},
  input:
    'switch(foo) {\n' +
    '  case "bar": break;\n' + 
    '}',
  expected:
    'switch(foo) {\n' +
    '  case "bar" : break;\n' + 
    '}',
});

helper.test({
  description:
    'Test conditional colon (before) - no change',
  options:
    {spacing: {before: {caseColon: false}}},
  input:
    'var foo = bar ? true : false;',
  expected:
    'var foo = bar ? true : false;',
});

helper.test({
  description:
    'Test comma no spacing (after)',
  options:
    {spacing: {after: {comma: false}}},
  input:
    'var foo = bar(a, b, c, d);',
  expected:
    'var foo = bar(a,b,c,d);',
});

helper.test({
  description:
    'Test comma spacing (after)',
  options:
    {spacing: {after: {comma: true}}},
  input:
    'var foo = bar(a,b,c,d);',
  expected:
    'var foo = bar(a, b, c, d);',
});

helper.test({
  description:
    'Test comma spacing (after). Not on new line',
  options:
    {spacing: {after: {comma: true}}},
  input:
    'var foo = bar(\n' +
    '  a,\n' +
    '  b,\n' +
    '  c\n' +
    ');',
  expected:
    'var foo = bar(\n' +
    '  a,\n' +
    '  b,\n' +
    '  c\n' +
    ');'
});

helper.test({
  description:
    'Test semicolon no spacing (after)',
  options:
    {spacing: {after: {semicolon: false}}},
  input:
    'for(var i=0; i<a.length; i++){}',
  expected:
    'for(var i=0;i<a.length;i++){}'
});

helper.test({
  description:
    'Test semicolon spacing (after)',
  options:
    {spacing: {after: {semicolon: true}}},
  input:
    'for(var i=0;i<a.length;i++){}',
  expected:
    'for(var i=0; i<a.length; i++){}'
});

helper.test({
  description:
    'Test semicolon spacing (after). No changes on new line.',
  options:
    {spacing: {after: {semicolon: true}}},
  input:
    'for(\n' +
    '  var i=0;\n' + 
    '  i<a.length;\n' +
    '  i++\n' +
    '){};',
  expected:
    'for(\n' +
    '  var i=0;\n' + 
    '  i<a.length;\n' +
    '  i++\n' +
    '){};'
});

helper.test({
  description:
    'Test logical not no spacing (after)',
  options:
    {spacing: {after: {logicalNot: false}}},
  input:
    'if(! foo && ! bar){}',
  expected:
    'if(!foo && !bar){}'
});

helper.test({
  description:
    'Test logical not spacing (after)',
  options:
    {spacing: {after: {logicalNot: true}}},
  input:
    'if(!foo && !bar){}',
  expected:
    'if(! foo && ! bar){}'
});

helper.test({
  description:
    'Test logical not spacing (after)',
  options:
    {spacing: {after: {logicalNot: true}}},
  input:
    'if(!foo && !bar){}',
  expected:
    'if(! foo && ! bar){}'
});

helper.test({
  description:
    'Test double logical not spacing (after)',
  options:
    {spacing: {after: {logicalNot: true}}},
  input:
    'if(!!foo){}',
  expected:
    'if(!! foo){}'
});

helper.test({
  description:
    'Test assignment-op no spacing (around)',
  options:
    {spacing: {around: {assignmentOp: false}}},
  input:
    'foo >>= bar;',
  expected:
    'foo>>=bar;'
});

helper.test({
  description:
    'Test assignment-op spacing (around)',
  options:
    {spacing: {around: {assignmentOp: true}}},
  input:
    'foo>>=bar;',
  expected:
    'foo >>= bar;'
});

helper.test({
  description:
    'Test logical-op no spacing (around)',
  options:
    {spacing: {around: {logicalOp: false}}},
  input:
    'var a = foo && bar;',
  expected:
    'var a = foo&&bar;'
});

helper.test({
  description:
    'Test logical-op spacing (around)',
  options:
    {spacing: {around: {logicalOp: true}}},
  input:
    'var a = foo||bar;',
  expected:
    'var a = foo || bar;'
});

helper.test({
  description:
    'Test relational-op no spacing (around)',
  options:
    {spacing: {around: {relationalOp: false}}},
  input:
    'var a = foo >= bar;',
  expected:
    'var a = foo>=bar;'
});

helper.test({
  description:
    'Test relational-op spacing (around)',
  options:
    {spacing: {around: {relationalOp: true}}},
  input:
    'var a = foo>bar;',
  expected:
    'var a = foo > bar;'
});

helper.test({
  description:
    'Test equal-op no spacing (around)',
  options:
    {spacing: {around: {equalOp: false}}},
  input:
    'var a = foo === bar;',
  expected:
    'var a = foo===bar;'
});

helper.test({
  description:
    'Test equal-op spacing (around)',
  options:
    {spacing: {around: {equalOp: true}}},
  input:
    'var a = foo!=bar;',
  expected:
    'var a = foo != bar;'
});

helper.test({
  description:
    'Test bitwise-op no spacing (around)',
  options:
    {spacing: {around: {bitwiseOp: false}}},
  input:
    'var a = foo & bar;',
  expected:
    'var a = foo&bar;'
});

helper.test({
  description:
    'Test bitwise-op spacing (around)',
  options:
    {spacing: {around: {bitwiseOp: true}}},
  input:
    'var a = foo^bar;',
  expected:
    'var a = foo ^ bar;'
});

helper.test({
  description:
    'Test cond-op no spacing (around)',
  options:
    {spacing: {around: {condOp: false}}},
  input:
    'var a = foo ? bar : baz;',
  expected:
    'var a = foo?bar:baz;'
});

helper.test({
  description:
    'Test bitwise-op spacing (around)',
  options:
    {spacing: {around: {condOp: true}}},
  input:
    'var a = foo?bar:baz;',
  expected:
    'var a = foo ? bar : baz;'
});

helper.test({
  description:
    'Test math-op no spacing (around)',
  options:
    {spacing: {around: {mathOp: false}}},
  input:
    'var a = foo + bar;',
  expected:
    'var a = foo+bar;'
});

helper.test({
  description:
    'Test math-op spacing (around)',
  options:
    {spacing: {around: {mathOp: true}}},
  input:
    'var a = foo%bar;',
  expected:
    'var a = foo % bar;'
});

helper.test({
  description:
    'Test shift-op no spacing (around)',
  options:
    {spacing: {around: {shiftOp: false}}},
  input:
    'var a = foo << bar;',
  expected:
    'var a = foo<<bar;'
});

helper.test({
  description:
    'Test shift-op spacing (around)',
  options:
    {spacing: {around: {shiftOp: true}}},
  input:
    'var a = foo>>>bar;',
  expected:
    'var a = foo >>> bar;'
});

helper.test({
  description:
    'Test braces no spacing (around)',
  options:
    {spacing: {around: {braces: false}}},
  input:
    'var a = { foo:bar };',
  expected:
    'var a = {foo:bar};'
});

helper.test({
  description:
    'Test braces spacing (around)',
  options:
    {spacing: {around: {braces: true}}},
  input:
    'var a = {foo:bar};',
  expected:
    'var a = { foo:bar };'
});

helper.test({
  description:
    'Test braces spacing (around). No manipulation',
  options:
    {spacing: {around: {braces: true}}},
  input:
    'var a = { \n' +
    '  foo:bar\n' +
    '};',
  expected:
    'var a = { \n' +
    '  foo:bar\n' +
    '};'
});

helper.test({
  description:
    'Test brackets no spacing (around)',
  options:
    {spacing: {around: {brackets: false}}},
  input:
    'var a = [ foo, bar, baz ];',
  expected:
    'var a = [foo, bar, baz];'
});

helper.test({
  description:
    'Test brackets spacing (around)',
  options:
    {spacing: {around: {brackets: true}}},
  input:
    'var a = [foo, bar, baz];',
  expected:
    'var a = [ foo, bar, baz ];'
});

helper.test({
  description:
    'Test parentheses no spacing (around)',
  options:
    {spacing: {around: {parentheses: false}}},
  input:
    'var a = ( foo || bar && baz );',
  expected:
    'var a = (foo || bar && baz);'
});

helper.test({
  description:
    'Test parentheses spacing (around)',
  options:
    {spacing: {around: {parentheses: true}}},
  input:
    'var a = foo(bar,baz);',
  expected:
    'var a = foo( bar,baz );'
});
