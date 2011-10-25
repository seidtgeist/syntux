var ZeParser = require('zeparser').ZeParser;
var util     = require('util');

module.exports = Syntux;
function Syntux() {
}

Syntux.parse = function(source) {
  return {
    source : source,
    ast    : ZeParser.parse(source)
  };
};

Syntux.stringify = function(parsed) {
  var source = parsed.source;
  var output = '';

  walk(parsed.ast);

  function walk(ast) {
    ast.forEach(function(node) {
      if (Array.isArray(node)) return walk(node);

      var value = (node.value)
        ? node.value
        : source.substr(node.start, node.stop - node.start);

      output += value;
    });
  }

  return output;
};
