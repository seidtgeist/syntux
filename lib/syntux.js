var Parser      = require('./parser');
var Stringifier = require('./stringifier');
var plugins     = require('./plugins');

module.exports = Syntux;
function Syntux() {
  this._parser = null;
}

Syntux.transform = function(source, options) {
  var syntux = new this();

  syntux.parse(source);
  syntux.transform(options);

  return syntux.stringify();
};

Syntux.prototype.parse = function(source) {
  this._parser = Parser.parse(source);
};

Syntux.prototype.transform = function(options) {
  for (var plugin in options) {
    // reparse after every plugin execution (clean tree for each plugin)
    this.parse(this.stringify());
    plugins[plugin](this._parser, options[plugin]);
  }
};

Syntux.prototype.stringify = function() {
  return Stringifier.stringify(this._parser);
};
