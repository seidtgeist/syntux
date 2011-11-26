var Parser  = require('./parser');
var plugins = require('./plugins');

module.exports = Syntux;
function Syntux() {}

Syntux.parse = function(source) {
  return Parser.parse(source);
};

Syntux.transform = function(source, options) {
  var tokens = this.parse(source);

  for (var pluginName in options) {
    var plugin = plugins[pluginName];

    if (tokens.length === 0 && !plugin.processEmptyFiles) continue;

    plugin.transform(tokens, options[pluginName]);
  }

  return tokens.toString();
};
