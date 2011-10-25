var Parser      = require('./parser');
var Stringifier = require('./stringifier');

module.exports = Syntux;
function Syntux() {
}

Syntux.parse = function(source) {
  return Parser.parse(source);
};

Syntux.stringify = function(ast) {
  return Stringifier.stringify(ast);
};
