module.exports = Stringifier;
function Stringifier(parser) {
  this._parser = parser;
}

Stringifier.stringify = function(parser) {
  var stringifier = new this(parser);
  return stringifier.stringify();
};

Stringifier.prototype.stringify = function(stack) {
  var wtree = this._parser.tokenizer.wtree;
  return wtree.reduce(function(output, node) {
    return output += node.value;
  }, '');
};
