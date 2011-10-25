var Parser = require('./parser');
var util   = require('util');

module.exports = Syntux;
function Syntux() {
}

Syntux.parse = function(source) {
  return Parser.parse(source);
};

Syntux.stringify = function(ast) {
  var self = this;
  return ast.reduce(function(output, node) {
    return output += (Array.isArray(node))
      ? self.stringify(node)
      : node.value;
  }, '');
};
