var Parser  = require('./parser');
var plugins = require('./plugins');

module.exports = Syntux;
function Syntux() {}

Syntux.parse = function(source) {
  return Parser.parse(source);
};

Syntux.transform = function(source, options) {
  var tokens = this.parse(source);

  for (var plugin in options) {
    plugins[plugin].transform(tokens, options[plugin]);
  }

  return tokens.toString();
};
