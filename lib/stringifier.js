module.exports = Stringifier;
function Stringifier(ast) {
  this._ast = ast;
}

Stringifier.stringify = function(ast) {
  var stringifier = new this();
  return stringifier.stringify(ast);
};

Stringifier.prototype.stringify = function(ast) {
  var self = this;
  return ast.reduce(function(output, node) {
    return output += (Array.isArray(node))
      ? self.stringify(node)
      : node.value;
  }, '');
};
