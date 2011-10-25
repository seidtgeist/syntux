var Parser      = require('./parser');
var Stringifier = require('./stringifier');

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
  // Magic goes here
};

Syntux.prototype.stringify = function() {
  return Stringifier.stringify(this._ast);
};
