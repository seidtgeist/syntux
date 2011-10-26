module.exports = Stringifier;
function Stringifier(parser) {
  this._parser = parser;
}

Stringifier.stringify = function(parser) {
  var stringifier = new this();
  return stringifier.stringify(parser.stack);
};

Stringifier.prototype.stringify = function(stack) {
  var self = this;
  return stack.reduce(function(output, node) {
    return output += (Array.isArray(node))
      ? self.stringify(node)
      : node.value;
  }, '');
};
