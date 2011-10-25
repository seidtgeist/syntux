var ZeParser = require('zeparser').ZeParser;

module.exports = Parser;
function Parser(source) {
  this._source = source;
  this._ast    = [];
}

Parser.parse = function(source) {
  var parser = new this(source);
  return parser.parse();
};

Parser.prototype.parse = function() {
  this._ast = ZeParser.parse(this._source);
  this._ast = this._enhanceAst(this._ast);

  return this._ast;
};

Parser.prototype._enhanceAst = function(nodes) {
  var self   = this;
  var source = this._source;

  nodes.forEach(function(node) {
    if (Array.isArray(node)) return self._enhanceAst(node);

    node.value = ('value' in node)
      ? node.value
      : source.substr(node.start, node.stop - node.start);
  });

  return nodes;
};
