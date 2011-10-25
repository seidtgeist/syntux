var Parser      = require('./parser');
var Stringifier = require('./stringifier');
var plugins     = require('./plugins');

module.exports = Syntux;
function Syntux(source, options) {
  this._ast = null;
}

Syntux.transform = function(source, options) {
  var syntux = new this();

  syntux.parse(source);
  syntux.transform(options);

  return syntux.stringify();
};

Syntux.prototype.parse = function(source) {
  this._ast = Parser.parse(source);
};

Syntux.prototype.transform = function(options) {
  for (var plugin in options) {
    plugins[plugin](this._ast, options[plugin]);
  }
};

Syntux.prototype.stringify = function() {
  return Stringifier.stringify(this._ast);
};
